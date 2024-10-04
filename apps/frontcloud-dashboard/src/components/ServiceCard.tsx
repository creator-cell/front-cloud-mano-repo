import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"
import React from 'react'

interface descriptionTextType {
    title: string
    color: string
    link?: string
}

interface ServiceCardProps {
    description: descriptionTextType[]
    image: string
}


const ServiceCard: React.FC<ServiceCardProps> = ({
    description,
    image
}) => {
    return (
        // <div className="w-full p-2 bg-gradient-to-tr from-[#0F84F4] to-[#05E9D9]">
        <Card className="bg-[#23202A] py-10 px-12 gap-8">
            <CardHeader className=" relative h-[100px]  w-full">
                <Image
                    src={image}
                    alt={"image"}
                    width={100}
                    height={55}
                    className=" object-contain "
                />
            </CardHeader>
            <CardContent >
                <p className=" text-[16px] gap-x-2 flex flex-wrap text-left font-[400] leading-[1.6] tracking-normal">
                    {description.map((desc, index) => (
                        desc.link ? (
                            <Link
                                key={index}
                                href={desc.link}
                                className={`text-[#05E9D9] `}
                            // className={`text-[${desc.color}] `}
                            >
                                {desc.title}
                            </Link>
                        ) : (
                            <span
                                key={index}
                                className={`text-[${desc.color}]`}
                            >
                                {desc.title}
                            </span>
                        )
                    ))}
                </p>
            </CardContent>
        </Card>
        // </div>

    )
}

export default ServiceCard
