'use client'

import {useCallback, useState} from "react";
import {motion} from "framer-motion";
import {Snowfall} from "react-snowfall";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Footer} from "@/components/footer";

export default function SplashPage() {
    const [showSnowfall, setShowSnowfall] = useState(false);

    const triggerSnowfall = useCallback(() => {
        setShowSnowfall(true);
        setTimeout(() => setShowSnowfall(false), 40000);
    }, [])

    return (
        <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
            {showSnowfall && <Snowfall snowflakeCount={200} />}
            <main className="flex-grow flex items-center justify-center">
                <div className="flex-grow flex items-center justify-center">
                    <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
                        <motion.div
                        className="text-center"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.95 }}
                        >
                            <motion.div
                            className="relative w-32 h-32 mx-auto mb-8 cursor-pointer"
                            whileHover={{ scale: 1.3 }}
                            onClick={triggerSnowfall}
                            whileTap={{ scale: 0.7 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            >
                                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"/>
                                <div className="relative h-full flex items-center justify-center text-5xl font-bold">
                                    ❄️
                                </div>
                            </motion.div>
                            <motion.h1
                            className="text-5xl md:text-6xl font-bold mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.95 }}
                            >
                                Welcome to snowycdn
                            </motion.h1>
                            <motion.p
                            className="text0xl md:text-2xl mb-12 max-w-2xl mx-auto"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.95 }}
                            >
                                A simple, fast, and secure CDN for all file needs
                            </motion.p>
                        </motion.div>
                        <motion.div
                        className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.95 }}
                        >
                            <Button asChild className="flex-1 bg-primary hoveR:bg-primary/90 text-primary-foreground py-6 text-lg">
                                <Link href="/register">Get Started</Link>
                            </Button>
                            <Button asChild variant="outline" className="flex-1 border-primary text-primary hover:bg-blue-300 py-6 text-lg">
                                <Link href="/login">Login</Link>
                            </Button>
                        </motion.div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}