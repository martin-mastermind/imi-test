import type { AspectRatio, Resolution } from '@/types';

const API_KEY = process.env.NEXT_PUBLIC_KIE_API_KEY!;
const BASE_URL = 'https://api.kie.ai/api/v1';

export async function createTask(
  prompt: string,
  aspectRatio: AspectRatio,
  resolution: Resolution = '1K',
  imageInputs: string[] = [],
): Promise<string> {
  const body: Record<string, unknown> = {
    model: 'nano-banana-2',
    input: {
      prompt: prompt.trim(),
      aspect_ratio: aspectRatio,
      resolution: resolution,
      output_format: 'jpg',
      ...(imageInputs.length > 0 ? { image_input: imageInputs } : {}),
    },
  };

  const res = await fetch(`${BASE_URL}/jobs/createTask`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`API error ${res.status}`);
  const json = await res.json();
  const taskId = json?.data?.taskId ?? json?.data?.task_id ?? json?.taskId;
  if (!taskId) throw new Error('No taskId in response');
  return String(taskId);
}

export async function pollJobStatus(taskId: string): Promise<string> {
  const maxAttempts = 120; // 4 minutes (2 seconds * 120)

  for (let i = 0; i < maxAttempts; i++) {
    if (i > 0) {
      await new Promise((r) => setTimeout(r, 2000));
    }

    const res = await fetch(`${BASE_URL}/jobs/recordInfo?taskId=${taskId}`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
    });
    if (!res.ok) continue;
    const json = await res.json();
    const data = json?.data ?? json;
    const status = data?.status ?? data?.state;
    if (status === 'completed' || status === 'success' || status === 'finished') {
      const url = data?.output?.url ?? data?.output?.[0]?.url ?? data?.imageUrl ?? data?.result_url ?? data?.output;
      if (url && typeof url === 'string') return url;
    }
    if (status === 'failed' || status === 'error') throw new Error(data?.error ?? 'Generation failed');
  }
  throw new Error('Timeout: generation took too long');
}

export function validateImageFile(file: File): void {
  if (file.size > 30 * 1024 * 1024) throw new Error('File too large (max 30MB)');
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) throw new Error('Only JPEG, PNG, and WebP allowed');
}

export async function uploadImageFile(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_UPLOAD_API_KEY || '',
    },
    body: formData,
  });

  if (!res.ok) throw new Error(`Upload failed: ${res.status}`);
  const json = await res.json();
  if (!json.url) throw new Error('No URL in upload response');
  return json.url;
}
