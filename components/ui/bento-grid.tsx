"use client";
import { cn } from "@/lib/utils";
import { BackgroundGradientAnimation } from "./background-gradient-animation";
import { GridGlobe } from "./grid-globe";
import Lottie from "react-lottie";
import { useState } from "react";
import animationData from "@/data/confetti.json";
import MagicButton from "./MagicButton";
import { IoCopyOutline } from "react-icons/io5";
import { motion } from "framer-motion";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-8 mx-auto",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
  id,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  img?: string,
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
  id: number;
}) => {

  const [copied, setcopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("chamarasudusinghe428@gmail.com");
    setcopied(true);
  }

  const getAnimationDirection = (id: number) => {
  const patterns = [
    { x: -100, y: 0 },   // From left
    { x: 100, y: 0 },    // From right
    { x: -100, y: 0 },   // From left
    { x: 100, y: 0 },    // From right
    { x: -100, y: 0 },   // From left
    { x: 0, y: 100 },    // From bottom
  ];
  return patterns[(id - 1) % patterns.length];
};

const animationProps = getAnimationDirection(id);

  return (
    <motion.div

      initial={{ opacity: 0, ...animationProps }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1], // Custom cubic bezier for smooth motion
        delay: (id - 1) * 0.15, // Slightly reduced delay for better flow
        opacity: { duration: 0.6 }, // Separate opacity timing
        x: { duration: 0.8, ease: "easeOut" },
        y: { duration: 0.8, ease: "easeOut" }
      }}
      viewport={{ once: false, margin: "-50px" }}

      className={cn(
        "row-span-1 relative overflow-hidden rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none  dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className,
      )}
      style={{
        background: 'rgb(4,7,29)',
        backgroundColor: 'linear-gradient(90deg, rgba(4,7,29,1) 0%, rgba(12,14,35,1) 100%)',
      }}
    >
      <div className={`${id === 6 && 'flex justify-center'} h-full`}>
        <div className="w-full h-full absolute">
            {img && (
                <img
                  src={img}
                  alt={img}
                  className={cn(imgClassName, 'object-cover, object-center')}
                />
            )}
        </div>
        <div className="w-full h-full absolute">
            {img && (
                <img
                  src={img}
                  alt={img}
                  className={cn(imgClassName, 'object-cover, object-center')}
                />
            )}
        </div>
        <div className={`absolute right-0 -bottom-5 ${id === 5 && 'w-full opacity-80'}`}>
            {spareImg && (
                <img
                src={spareImg}
                alt={spareImg}
                className={'object-cover, object-center w-full h-full'}
                />
            )}
        </div>
        
        {id === 6 && (
          <BackgroundGradientAnimation>
            <div className="absolute z-50 flex items-center justify-center text-white font-bold"/>
          </BackgroundGradientAnimation>
        )}

        <div className={cn(titleClassName, 'group-hover/bento:translate-x-2 transition duration-200 relative md:h-full min-h-40 flex flex-col px-5 p-5 lg:p-10')}>
          <div className="font-sans text-sm font-extralight text-{#c1c2d3} md:text-xs lg:text-base z-10">
            {description}
          </div>
          <div className="font-sans font-bold text-lg lg:text-3xl max-w-96 z-10">
            {title}
          </div>

          {id === 2 && <GridGlobe />}

          {id === 3 && (
            <div className="flex gap-1 lg:gap-5 w-fit absolute -right-3 lg:-right-2">
              <div className="flex flex-col gap-3 lg:gap-8">
                {['React', 'Next.js', 'TypeScript'].map((item) => (
                  <span key={item} className="py-2 lg:py-4 lg:px-3 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]">{item}</span>
                ))}
                <span className="py-4 px-3 rounded-lg text-center bg-[#10132E]"/>
              </div>
              <div className="flex flex-col gap-3 lg:gap-8">
                <span className="py-4 px-3 rounded-lg text-center bg-[#10132E]"/>
                {['React', 'TailwindCSS', ''].map((item) => (
                  <span key={item} className="py-2 lg:py-4 lg:px-3 px-3 text-xs lg:text-base opacity-50 lg:opacity-100 rounded-lg text-center bg-[#10132E]">{item}</span>
                ))}               
              </div>
            </div>
          )}

          {id === 6 && (
            <div className="mt-5 relative">
              <div className={`absolute -bottom-5 right-0`}>
                <Lottie options={{
                  loop: copied,
                  autoplay: copied,
                  animationData,
                  rendererSettings: { preserveAspectRatio: 'xMidYMid slice' }
                }} />
              </div>

              <MagicButton
                title={copied ? 'Email Copied!' : 'Copy My Email'}
                icon={<IoCopyOutline />}
                position="left"
                otherClasses="bg-[#161A31]"
                handleclick={handleCopy}
              />
            </div>
          )}
        </div>
      </div>

      <div className="transition duration-200 group-hover/bento:translate-x-2"></div>
    </motion.div>
  );
};
