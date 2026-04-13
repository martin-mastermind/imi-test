import { motion } from "framer-motion";
import UploadIcon from "@/../public/icons/icon-upload.svg";

interface UploadButtonProps {
  onClick: () => void;
  inRow?: boolean;
  className?: string;
  tapScale?: number;
}

export default function UploadButton({
  onClick,
  inRow,
  className = "",
  tapScale = 0.95,
}: UploadButtonProps) {
  const svgClassNames = !inRow ? "" : "mt-[19px]";
  const pClassNames = !inRow
    ? "gap-[7px] ml-[-14px] mt-[4px]"
    : "flex-col mt-[8px] ml-[3px] justify-center";

  return (
    <motion.button
      onClick={onClick}
      className={className}
      whileTap={{ scale: tapScale }}
    >
      <UploadIcon
        className={`ml-[-1px] ${svgClassNames}`}
        width={41}
        height={41}
      />
      <p className={`flex items-center ${pClassNames}`}>
        <span className="text-text-muted text-[14px] font-norms">
          Загрузите изображения
        </span>
        <span className="text-[rgba(255,255,255,0.2)] text-[14px] font-norms">
          (до 10)
        </span>
      </p>
    </motion.button>
  );
}
