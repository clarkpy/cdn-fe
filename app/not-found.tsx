"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.div
          className="text-8xl mb-8"
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.0, ease: "circInOut" }}
        >
          ❄️
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">File not found</h2>
        <p className="text-lg md:text-xl text-gray-400 mb-8 max-w-md mx-auto">
          The file you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button asChild className="bg-white hover:bg-[#222] text-black hover:text-white py-6 px-8 text-lg">
            <Link href="/">Return Home</Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  )
}

