'use client'

import React, {useState, useEffect} from "react";
import Image from "next/image";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger} from "@/components/ui/alert-dialog"
import {motion} from "framer-motion";
import {toast} from "@/hooks/use-toast";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {Card, CardContent, CardFooter} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import Cookie from 'js-cookie';



export default function Dash() {
    const [images, setImages] = useState<{ name: string; size: number; url: string; uploadDate: string }[]>([])

    useEffect(() => {
        const fetchImages = async () => {
            const response = await fetch('https://dk1.snowy.codes/getall', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: Cookie.get('username'),
                    apiKey: Cookie.get('apiKey'),
                }),
            });
            const data = await response.json();
            const filesWithSize = await Promise.all(data.files.map(async (file: string) => {
                const sizeResponse = await fetch(`https://dk1.snowy.codes/info/${Cookie.get('username')}/${file}`);
                const sizeData = await sizeResponse.json();
                return { name: file, size: sizeData.fileSize, url: `https://dk1.snowy.codes/${Cookie.get('username')}/${file}`, uploadDate: sizeData.uploadDate };
            }));
            const sortedImages = filesWithSize.sort((a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime());
            setImages(sortedImages);
        };

        fetchImages();
    }, [])

    const handleDel = (name:string) => {
        setImages(images.filter((img) => img.name !== name))
        // api call to delete image from cdn soon
        toast({
            title: "Image deleted",
            description: "The image has been deleted from the file server",
        })
    }

    const handleCopyLink = (url:string) => {
        navigator.clipboard.writeText(url)
        toast({
            title: "Link copied",
            description: "The link has been copied to your clipboard",
        })
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <header className="bg-[#111] border-b border-[#222] p-4">
                <div className="mx-auto flex container justify-between items-center">
                    <motion.div
                    className="relative h-10 w-auto"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    >
                        <div className="absolute inset-0 bg-primary/20 rounded-lg blur-xl"/>
                        <div className="relative h-10 flex items-center justify-center text-xl font-bold text-white">
                            snowycdn
                        </div>
                    </motion.div>
                    <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    >
                        <Button asChild variant={"ghost"} className={"text-white hover:text-primary"}>
                            <Link href="/login">Logout</Link>
                        </Button>
                    </motion.div>
                </div>
            </header>
            <main className="container mx-auto sm:p-8 p-4">
                <h1 className="text-2xl font-bold mb-6 flex items-center justify-between">Your Files <Button variant={"outline"} size={"sm"} className={"bg-white text-black hover:bg-[#222] hover:text-white"}
                onClick={() => { 
                    fetch('https://dk1.snowy.codes/api/v1/sxcu-config', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username: Cookie.get('username'),
                            apiKey: Cookie.get('apiKey'),
                        }),
                    })
                    .then(response => response.blob())
                    .then(blob => {
                        const url = window.URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = 'config.sxcu';
                        document.body.appendChild(a);
                        a.click();
                        a.remove();
                        window.URL.revokeObjectURL(url);
                    })
                    .catch(error => console.error('exception caught:', error));
                }}
                >Setup Config</Button></h1>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image, index) => (
                        <Card key={index} className="overflow-hidden bg-[#111] border-[#222]">
                            <CardContent className="p-0">
                                <div className="relative aspect-video">
                                    <Image
                                        src={image.url}
                                        alt={image.name}
                                        layout="fill"
                                        objectFit="cover"
                                        className="rounded-t-lg"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="flex flex-col items-start gap-2 p-4">
                                <div className="flex justify-between items-center w-full">
                                    <h3 className="font-semibold text-white">{image.name}</h3>
                                    <span className="text-sm text-gray-500">{image.size}</span>
                                </div>
                                <div className="flex gap-2 w-full">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="outline" size="sm" className="flex-1">View Details</Button>
                                        </DialogTrigger>
                                        <DialogContent className="bg-[#111] border-[#222] text-white">
                                            <DialogHeader>
                                                <DialogTitle>Image Details</DialogTitle>
                                                <DialogDescription className="text-gray-400">Details
                                                    for {image.name}</DialogDescription>
                                            </DialogHeader>
                                            <div className="grid gap-4 py-4">
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="name" className="text-right">Name</Label>
                                                    <Input id="name" value={image.name}
                                                           className="col-span-3 bg-[#1A1A1A] border-[#333] text-white"
                                                           readOnly/>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="url" className="text-right">URL</Label>
                                                    <Input id="url" value={image.url}
                                                           className="col-span-3 bg-[#1A1A1A] border-[#333] text-white"
                                                           readOnly/>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="size" className="text-right">Size</Label>
                                                    <Input id="size" value={image.size}
                                                           className="col-span-3 bg-[#1A1A1A] border-[#333] text-white"
                                                           readOnly/>
                                                </div>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <Label htmlFor="uploadDate" className="text-right">Upload Date</Label>
                                                    <Input id="uploadDate" value={image.uploadDate}
                                                           className="col-span-3 bg-[#1A1A1A] border-[#333] text-white"
                                                           readOnly/>
                                                </div>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                    <Button variant="outline" size="sm" className="flex-1"
                                            onClick={() => handleCopyLink(image.url)}>Copy Link</Button>
                                                
                                    <AlertDialog>
                                      <AlertDialogTrigger asChild>
                                      <Button variant="destructive" size="sm" className="flex-1">
                                            Delete
                                      </Button>
                                      </AlertDialogTrigger>
                                      <AlertDialogContent>
                                        <AlertDialogHeader>
                                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                          <AlertDialogDescription>
                                            This action cannot be undone and will
                                            permanently delete this image from the server.
                                          </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                                          <AlertDialogAction onClick={() => handleDel(image.name)}>Confirm</AlertDialogAction>
                                        </AlertDialogFooter>
                                      </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                <motion.div
                    className={"mt-5"}
                    whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                >
                    <Button asChild className="w-full bg-white text-black hover:bg-[#222] hover:text-white">
                        <Link href="/upload">Upload</Link>
                    </Button>
                </motion.div>
            </main>
        </div>
    )
}
  