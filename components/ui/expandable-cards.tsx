"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export function ExpandableCardDemo() {
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);
  
  useOutsideClick(ref as React.RefObject<HTMLDivElement>, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-customblack-100 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            {/* Overlay with blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-10"
            />
            {/* Expanded Card */}
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6 z-20"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[80vw] h-fit md:max-w-[500px] md:h-fit rounded-2xl md:rounded-3xl flex flex-col bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-400 overflow-hidden z-20"
            >
              <div>
                <div className="flex justify-between items-start p-4">
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-medium text-neutral-700 dark:text-neutral-200 text-base"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 dark:text-neutral-400 text-base"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                  {!active.ctaDisabled && (
                    <motion.a
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      href={active.ctaLink}
                      target="_blank"
                      className="px-4 py-3 text-sm rounded-full font-bold bg-white text-black"
                    >
                      {active.ctaText}
                    </motion.a>
                  )}
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <h1 id="projects" className="uppercase text-center text-blue-100 text-[40px] md:text-5xl lg:text-6xl my-10">projects</h1>
      <ul className="w-[75vw] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-4 border border-neutral-200 dark:border-white/[0.2] p-4 rounded-3xl my-10">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="relative p-4 md:p-6 flex flex-col items-center justify-center rounded-xl cursor-pointer border border-neutral-200 dark:border-white/[0.2] card-angled-lines transition-all duration-300 hover:shadow-xl hover:scale-105 hover:border-blue-400 dark:hover:border-blue-300"
            style={{ minHeight: 220, height: 260 }}
          >
            <div className="flex w-full h-full items-center justify-center">
              <motion.h3
                layoutId={`title-${card.title}-${id}`}
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-neutral-800 dark:text-neutral-100 text-center break-words"
              >
                {card.title}
              </motion.h3>
            </div>
            <div className="absolute bottom-3 right-4 flex flex-wrap lg:flex-nowrap gap-2 justify-end max-w-[90%] overflow-x-auto scrollbar-thin scrollbar-thumb-blue-200">
              {card.stack.map((tech: string) => (
                <span
                  key={tech}
                  className="px-2 md:px-2 lg:px-1 py-1 rounded-full border border-blue-200 bg-blue-50 text-xs md:text-xs lg:text-[10px] xl:text-[10px] font-semibold dark:border-blue-400 dark:bg-blue-900 dark:text-blue-100 transition-all whitespace-nowrap"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "In progress",
    title: "Modern Portfolio",
    ctaText: "Visit",
    ctaLink: "https://sandaru-dev.vercel.app/",
    stack: ["Next.js", "TypeScript", "TailwindCSS"],
    ctaDisabled: false,

    content: () => (
      <p>
        A responsive and visually modern developer portfolio built using Next.js, TypeScript, and TailwindCSS.
        The project incorporates components from Aceternity UI to enhance the design and usability.
        It demonstrates a strong focus on performance, accessibility, and clean user interface design,
        making it suitable for showcasing technical skills and personal projects.
      </p>
    ),
  },
  {
    description: "For a frictionless attendance tracking system",
    title: "Analytics Dashboard",
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    stack: ["Next.js", "TypeScript", "TailwindCSS"],
    ctaDisabled: true,

    content: () => (
      <p>
        An analytics dashboard designed for a frictionless attendance tracking system.
        It provides insights into database records including total entries, exits, duplicated faces,
        and unique face detections. Built using Next.js, TypeScript, and TailwindCSS, the interface ensures a clean,
        responsive, and user-friendly experience for monitoring attendance data in real time.
        The dashboard features interactive charts, graphs, and tables that allow users to visualize
        attendance trends, identify patterns, and make data-driven decisions.
      </p>
    ),
  },
  {
    description: "In progress",
    title: "Business Management WebApp",
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    stack: ["Next.js", "TypeScript", "TailwindCSS", "Firebase"],
    ctaDisabled: true,

    content: () => (
      <p>
        A full-stack business management platform developed for a cabinet design company.
        Built with Next.js, TypeScript, TailwindCSS, and Firebase, the application features robust API routing,
        role-based authentication, real-time database management, and comprehensive server-side functionalities.
        It streamlines operations by managing users, data, and access control within a secure and scalable environment.
      </p>
    ),
  },
];
export default ExpandableCardDemo;