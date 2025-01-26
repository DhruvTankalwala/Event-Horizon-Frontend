import  React from "react"
import { motion } from "framer-motion"

export function GradientBackground({
  children,
  variant = "ethereal",
  animate = true,
  className,
  ...props
}) {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Base background color */}
      <div className="fixed inset-0 bg-[#0F0F1A]" />

      {/* Animated gradient background */}
      <motion.div
        className="fixed inset-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Main gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/20 via-purple-500/20 to-blue-900/40" />

        {/* Animated smoke-like effects */}
        <div className="absolute inset-0 opacity-50">
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-pink-300/30 via-purple-400/20 to-transparent"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-600/20 to-blue-900/30"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>

        {/* Ethereal light effects */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-pink-300/20 rounded-full mix-blend-overlay filter blur-3xl"
            animate={{
              y: [0, 50, 0],
              x: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full mix-blend-overlay filter blur-3xl"
            animate={{
              y: [0, -50, 0],
              x: [0, -30, 0],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
        </div>

        {/* Smoke animation layers */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage:
                "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxkZWZzPjxmaWx0ZXIgaWQ9ImEiIHg9IjAlIiB5PSIwJSIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIuMDUiIG51bU9jdGF2ZXM9IjIiIHN0aXRjaFRpbGVzPSJzdGl0Y2giIHR5cGU9ImZyYWN0YWxOb2lzZSIvPjwvZmlWHQ+PC9zdmc+')",
              backgroundSize: "400% 400%",
            }}
          />
        </div>
      </motion.div>

      {/* Content wrapper with backdrop blur */}
      <div className="relative min-h-screen">
        <div className="relative z-10">{children}</div>
      </div>
    </div>
  )
}

