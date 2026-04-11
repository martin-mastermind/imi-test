"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";
import AgentCard from "./AgentCard";
import Input from "./Input";
import HeroCard from "./HeroCard";

const AGENTS = [
  {
    name: "Сценарист Reels",
    url: "/images/agent-reels-scriptwriter.png",
  },
  {
    name: "SMM-Менеджер",
    url: "/images/agent-smm-manager.png",
  },
  {
    name: "ИИ-фотограф",
    url: "/images/agent-ai-photographer.png",
  },
  {
    name: "Нейрофотограф",
    url: "/images/agent-neuro-photographer.png",
  },
];

const HERO_CARDS = [
  {
    name: "image-gen",
    title: "Сгенерировать\nизображение",
    image: "/images/hero-image-generation.png",
    tags: [
      ["Banana Pro", "Flux", "Midjourney"],
      ["GPT Image", "Seedream", "Ideogram"],
    ],
    functional: true,
  },
  {
    name: "video-gen",
    title: "Сгенерировать видео",
    image: "/images/hero-video-generation.png",
    tags: [["Kling", "Veo3", "Hailuo", "Sora 2"]],
  },
  {
    name: "train",
    title: "Натренировать\nмодель с помощью\nсвоих фотографий",
    image: "/images/hero-model-training.png",
  },
  {
    name: "process",
    title: "Обработать фото",
    image: "/images/hero-photo-processing.png",
    height: "h-[320px]",
  },
];

const TEMPLATES = [
  {
    label: "Soft Roses",
    url: "/images/template-soft-roses-1.png",
  },
  {
    label: "Soft Roses",
    url: "/images/template-soft-roses-2.png",
  },
  {
    label: "Soft Roses",
    url: "/images/template-soft-roses-3.png",
  },
];

interface HomeScreenProps {
  onNavigateToGenerator: () => void;
}

export default function HomeScreen({ onNavigateToGenerator }: HomeScreenProps) {
  const [inputValue, setInputValue] = useState("");
  const [model, setModel] = useState("GPT-5.2");

  const handleSend = () => {
    if (inputValue.trim()) {
      console.log("Sending:", inputValue, "with model:", model);
      setInputValue("");
    }
  };

  return (
    <div className="bg-bg-main min-h-screen text-text-light overflow-y-auto">
      {/* Header */}
      <div className="pt-[25px] px-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Image
            src="/images/logo-imi.svg"
            alt="IMI"
            width={62}
            height={24}
          />
          <div className="bg-blue-accent rounded-[6px] px-[5px] py-[4px] flex items-center gap-[3px]">
            <Image
              src="/icons/icon-circle-dot.svg"
              alt=""
              width={10}
              height={10}
            />
            <span className="text-white text-[10px] font-norms">Go!</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-[#e8eaee] rounded-full p-2 flex items-center justify-center">
            <Image src="/icons/icon-user.svg" alt="user" width={16} height={16} />
          </div>
          <div className="bg-[#e8eaee] rounded-full px-3 py-2 flex items-center gap-1 text-black text-[12px] font-norms">
            <span>50</span>
            <Image
              src="/icons/icon-coins.svg"
              alt="coins"
              width={12}
              height={12}
            />
          </div>
        </div>
      </div>

      {/* Heading */}
      <div className="text-center pt-[42px] px-4">
        <h1 className="font-machina font-bold text-[24px] text-white leading-[30px]">
          Чем я могу помочь Вам сегодня?
        </h1>
      </div>

      {/* Input */}
      <div className="mt-[30px] mx-4">
        <Input />
      </div>

      {/* AI Agents Section */}
      <div className="mt-[40px] px-4">
        <h2 className="font-machina font-medium text-[22px] text-white leading-[24.2px] mb-4">
          Умные AI-Агенты
        </h2>
        <div className="flex gap-[12px] overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
          {AGENTS.map((agent) => (
            <AgentCard
              key={agent.name}
              name={agent.name}
              imageUrl={agent.url}
            />
          ))}
        </div>
      </div>

      {/* Hero Cards */}
      {HERO_CARDS.map((card) => (
        <HeroCard
          key={card.name}
          title={card.title}
          image={card.image}
          tags={card.tags}
          height={card.height}
          functional={card.functional}
          onClick={() => card.functional && onNavigateToGenerator()}
        />
      ))}

      {/* Templates Section */}
      <div className="mt-6 px-4">
        <h2 className="font-machina font-medium text-[26px] text-white mb-4">
          Фото и видео шаблоны
        </h2>
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4">
          {TEMPLATES.map((template, idx) => (
            <div
              key={idx}
              className="relative w-[240px] h-[305px] rounded-[16px] overflow-hidden flex-shrink-0"
            >
              <Image
                src={template.url}
                alt={template.label}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-4 font-machina font-bold text-[20px] text-text-light">
                {template.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Show All Button */}
      <div className="mt-8 mb-12 text-center">
        <motion.button
          className="bg-blue-accent rounded-[10px] h-[48px] px-7 flex items-center gap-1 justify-center mx-auto text-white text-[14px] font-norms"
          whileTap={{ scale: 0.95 }}
        >
          <Image
            src="/icons/icon-show-all.svg"
            alt="icon"
            width={10}
            height={10}
          />
          Показать все
        </motion.button>
      </div>
    </div>
  );
}
