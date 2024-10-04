"use client";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Image from 'next/image'
import productImg from "@/assets/extra/product1.jpg"
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import RatingStar from "./RatingStar";
import GroceryImages from "@/assets/grocery/index";
import { Heart, Plus } from "lucide-react";

import { CiHeart } from "react-icons/ci";


interface Card {
    productImg?: string;
    title: string;
    price: number;
    discountPrice: number;
    rating: number;
}

interface ProductCardProps {
    card: Card
}


const ProductCategoryCard: React.FC<ProductCardProps> = ({
    card: { productImg, title, price, discountPrice, rating }
}) => {
    const router = useRouter()
    return (
        <Card
            className="w-full border p-4 pb-0 border-none rounded-md cursor-pointer space-y-5 relative group">
            <CardContent onClick={() => router.push('/shop?category=electronics')} className='mt-2 space-y-1'>
                <CardHeader className="group-hover:scale-105 duration-200 pb-3">
                    <Image
                        src={GroceryImages.card1.price}
                        alt="product"
                        width={300}
                        height={300}
                        className="rounded-md"
                    />
                </CardHeader>
                <CardTitle className='text-base whitespace-nowrap text-center truncate '>{title}</CardTitle>

            </CardContent>
            <CardFooter className="p-0 flex flex-col justify-between items-center pb-4 ">
                <CardDescription className='text-primary whitespace-nowrap'>From ₹ {price}</CardDescription>
                <CardDescription className='text-gray-700 text-xs  whitespace-nowrap'>Boat , OnePlus & more</CardDescription>

            </CardFooter>
        </Card>
    )
}


export default ProductCategoryCard;