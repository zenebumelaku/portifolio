import { motion } from "framer-motion";

export const HeroVisual = () => {
  return (
    <div className="relative h-[420px] w-full overflow-hidden rounded-[2rem] bg-neutral-100">
      <img
        src="/photo.jpeg"
        alt="Portrait of Zenebu Melaku"
        className="absolute inset-0 h-full w-full object-cover grayscale"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
      ></motion.div>
      <div className="absolute bottom-5 left-5 rounded-full border border-white/40 bg-black/35 px-3 py-1.5 text-xs font-medium text-white backdrop-blur">
        Zenebu Melaku
      </div>
    </div>
  );
};
