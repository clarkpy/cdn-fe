'use client'

import Link from "next/link"
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { toast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"
import Cookie from 'js-cookie'

export default function RegPage() {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-black p-4 sm:p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="w-full max-w-4xl bg-[#111] border-[#222] p-6">
                    <CardHeader className="flex flex-col items-center space-y-2 pb-2">
                        <motion.div
                            className="relative w-auto h-16 mb-2"
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 400, damping: 10 }}
                        >
                            <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl" />
                            <div className="relative h-16 flex items-center justify-center text-2xl font-bold text-white">
                                snowycdn
                            </div>
                        </motion.div>
                        <h1 className="text-2xl font-semibold text-white">Make an account</h1>
                    </CardHeader>
                    <CardContent className="space-y-6 px-6">
                    <form
                        onSubmit={async (event) => {
                            event.preventDefault()
                            const formData = new FormData(event.currentTarget)
                            const username = formData.get("username")
                            const password = formData.get("password")
                            const invitecode = formData.get("invitecode")

                            if (!username || !password || !invitecode) {
                                toast({
                                    title: "Request failed",
                                    description: `Please fill all the fields`,
                                })
                                return
                            }

                            const response = await fetch("https://dk1.snowy.codes/api/v1/signup", {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({
                                    username,
                                    password,
                                    inviteCode: invitecode,
                                }),
                            })
                            const data = await response.json()

                            if (response.ok) {
                                
                                toast({
                                    title: "Account Created",
                                    description: `Welcome to snowycdn ${username}!`,
                                })

                                Cookie.set('apiKey', data.apiKey, { expires: 7})
                                Cookie.set('username', username.toString(), { expires: 7})
                                window.location.href = '/dashboard'

                            } else {
                                toast({
                                    title: "Error Occured",
                                    description: `${data.error}`,
                                })
                            }
                        }}
                    >

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-white text-lg">Username</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    placeholder="Eg: snowy"
                                    className="bg-[#1A1A1A] border-[#333] text-white text-lg py-6"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-white text-lg">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Eg: H1GhSeAs2024!!"
                                    className="bg-[#1A1A1A] border-[#333] text-white text-lg py-6"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="invitecode" className="text-white text-lg">Invite Code</Label>
                                <Input
                                    id="invitecode"
                                    name="invitecode"
                                    placeholder="Eg: XXXX-XXXX"
                                    className="bg-[#1A1A1A] border-[#333] text-white text-lg py-6"
                                />
                            </div>
                        </div>
                            <Button
                                className="w-full bg-white text-black hover:bg-[#222] hover:text-white text-lg py-6 mt-6"
                                type="submit"
                            > 
                                Register
                            </Button>
                        </form>
                        <div className="text-center">
                            <Link
                                href="/login"
                                className="text-white text-lg"
                            >
                                Already have an account? Login
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
            <Toaster />
        </div>
    )
}