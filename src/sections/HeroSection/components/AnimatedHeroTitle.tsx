import { motion } from "framer-motion";

export const AnimatedHeroTitle = () => {
  const words = ["ZENEBU", "MELAKU"];

  return (
    <h1 className="max-w-3xl text-[44px] font-bold leading-[1.03] tracking-[-0.045em] text-neutral-950 sm:text-[58px] md:text-[72px]">
      {words.map((word, index) => (
        <motion.span
          key={word}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: index * 0.08 }}
          className="mr-3 inline-block"
        >
          {word}
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.18 }}
        className="inline-block text-neutral-400"
      >
        builds.
      </motion.span>
    </h1>
  );
};
