import { motion } from 'framer-motion';

export function AnimatedLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 1.5,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
      />
      <motion.p 
        className="mt-6 text-lg font-medium text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Analyzing content...
      </motion.p>
      <motion.p 
        className="mt-2 text-muted-foreground text-center max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Our AI is reading the blog and extracting key insights
      </motion.p>
    </div>
  );
}