"use client";
import { useScroll, useTransform, useAnimation } from "framer-motion";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);

  const firstAnimControls = useAnimation();
  const secondAnimControls = useAnimation();
  const thirdAnimControls = useAnimation();

  const third = Math.ceil(images.length / 3);
  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  // Infinite scrolling function
  const infiniteScroll = async (controls: any, direction: number, distance: number) => {
    while (true) {
      await controls.start({
        y: [0, distance * direction],
        transition: {
          duration: 10, // Adjust this for speed
          ease: "linear",
        },
      });
      await controls.start({
        y: 0, // Reset position
        transition: { duration: 0 },
      });
    }
  };

  useEffect(() => {
    infiniteScroll(firstAnimControls, -1, 300); // Scroll up
    infiniteScroll(secondAnimControls, 1, 300);  // Scroll down
    infiniteScroll(thirdAnimControls, -1, 300);  // Scroll up
  }, [firstAnimControls, secondAnimControls, thirdAnimControls]);

  return (
    <div
      className={cn("h-[40rem] items-start overflow-y-hidden hide-scrollbar w-full", className)}
      ref={gridRef}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 items-start max-w-5xl mx-auto gap-2 py-40 px-2"
      >
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <motion.div
              animate={firstAnimControls} // Auto-scroll animation control
              key={"grid-1" + idx}
            >
              <Image
                src={el}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="400"
                width="200"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <motion.div animate={secondAnimControls} key={"grid-2" + idx}>
              <Image
                src={el}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="400"
                width="200"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <motion.div animate={thirdAnimControls} key={"grid-3" + idx}>
              <Image
                src={el}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                height="400"
                width="200"
                alt="thumbnail"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
