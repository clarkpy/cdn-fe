'use client'

import {useParams} from "next/navigation";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

interface ImageDetails {
    filename: string
    uploaded_by: string
    fileSize: string
    date: string
}

export default function ImageRenderer() {
    const params = useParams()
    const [imageDetails, setImageDetails] = useState<ImageDetails | null>(null)
    const [isLoad, setIsLoad] = useState(true)
    const [err, setErr] = useState<string | null>(null)

    const cdnInfoUrl = `https://dk1.snowy.codes/info/${params.user}/${params.filename}`
    const cdnImageUrl = `https://dk1.snowy.codes/${params.user}/${params.filename}`

    useEffect(() => {
        const fetchImageDetails = async () => {
            try {
                const response = await fetch(cdnInfoUrl)
                if (!response.ok) {
                    throw new Error("Failed to fetch image info")
                }
                const data = await response.json()
                setImageDetails({
                    filename: String(params.filename),
                    uploaded_by: data.user,
                    fileSize: data.fileSize,
                    date: data.uploadDate
                })
            } catch (error) {
                setErr(`Could not fetch details: ${error}`)
                redirect("/not-found")
            } finally {
                setIsLoad(false)
            }
        }

        fetchImageDetails()
    }, [cdnInfoUrl, params.filename])

    if (isLoad) {
        return <div className={"flex justify-center items-center h-screen bg-black text-white"}>Loading...</div>
    }

    if (err || !imageDetails) {
        return (
            <div className={"flex justify-center items-center h-screen bg-black text-white"}>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 0.5}}
                >
                    {err || 'Image not found'}
                </motion.div>
            </div>
        )
    }

    return (
        <div className={"min-h-screen bg-black text-white flex items-center justify-center p-4"}>
            <motion.div
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5}}
            >
                <Card className={"w-full max-w-2xl bg-[#111] border-[#222]"}>
                    <CardContent className={"p-6"}>
                        <div className={"relative aspect-video mb-4"}>
                            <Image
                                src={cdnImageUrl}
                                placeholder="blur"
                                blurDataURL="/placeholder.svg"
                                width={4000}
                                height={4000}
                                alt={imageDetails.filename}
                                objectFit="contain"
                                className="rounded-lg"
                            />
                        </div>
                        <h2 className={"text-2xl font-bold mb-2 text-white"}>{imageDetails.filename}</h2>
                        <p className={"text-gray-400 mb-1"}>Uploaded by: {imageDetails.uploaded_by}</p>
                        <p className={"text-gray-400"}>Filesize: {imageDetails.fileSize}</p>
                        <p className={"text-gray-400"}>Date: {imageDetails.date}</p>
                    </CardContent>
                    <CardFooter>
                        <Button
                        asChild
                        className={"w-full bg-white hover:bg-black hover:text-white text-black"}
                        >
                            <a href={cdnImageUrl} target="_blank" rel="noopener noreferrer">
                                View Raw
                            </a>
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}