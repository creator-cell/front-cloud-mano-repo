import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import GroceryImages from "@/assets/grocery/index"
import Image from "next/image"

interface card {
    offerImage?: string;
    title: string;
    description: string;
    validity: string;
    logo?: string;
    code: string;
}

interface OfferCardProps {
    card: card;
}

const OfferCard: React.FC<OfferCardProps> = ({
    card,
}) => {
    return (
        <Card className="rounded-t-lg bg-gray-50 space-y-4">
            <CardContent className="flex p-4">
                <CardHeader>
                    <Image src={card.logo ?? GroceryImages.card1.name} alt="offer" className=" w-28 object-cover" />
                    <CardTitle className={`text-red-500 text-2xl font-bold`}>{card.title}</CardTitle>
                    <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <Image src={card.offerImage ?? GroceryImages.card1.price} alt="offer" className="w-52 object-cover" />
            </CardContent>
            <CardDescription className="px-4">{card.validity}</CardDescription>

            <CardFooter className="flex  bg-red-500 justify-between text-white py-2 rounded-b-lg">
                <div>
                    code : <span className="text-white">{card.code}</span>
                </div>
                <Button variant={"outline"} className="capitalize bg-gradient-to-r from-red-500 to-slate-50 hover:text-white ">
                    copy code
                </Button>
            </CardFooter>
        </Card>
    )
}


export default OfferCard
