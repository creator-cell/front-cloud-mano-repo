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
    productImg: string;
    title: string;
    price: number;
    discountPrice: number;
    rating: number;
}

interface ProductCardProps {
    card: Card
}


const ProductCard: React.FC<ProductCardProps> = ({
    card: { productImg, title, price, discountPrice, rating }
}) => {
    const router = useRouter()
    return (
        <Card
            className="w-full border p-4 pb-0 border-primary rounded-md cursor-pointer space-y-3 relative">
            <CardContent onClick={() => router.push('/shop/1')} className='mt-2 space-y-1'>
                <CardHeader>
                    <Image
                        src={GroceryImages.card1.price}
                        alt="product"
                        width={300}
                        height={300}
                        className="rounded-md"
                    />
                </CardHeader>
                <CiHeart className='absolute top-0 right-2' size={25} />
                <RatingStar rating={rating} />
                <CardTitle className='text-base whitespace-nowrap truncate '>{title}</CardTitle>

            </CardContent>
            <CardFooter className="p-0 flex justify-between items-end pb-4 ">
                <div className='mt-3'>
                    <Label>Price</Label>
                    <div className='flex items-center gap-2'>
                        <CardDescription className='text-primary whitespace-nowrap'>₹ {price}</CardDescription>
                        <CardDescription className='text-red-500 line-through whitespace-nowrap'>₹ {discountPrice}</CardDescription>

                    </div>
                </div>
                <Button className='size-10 p-0 bg-store-primary hover:bg-store-primary'>
                    <Plus size={25} className='' />
                </Button>
            </CardFooter>
        </Card>
    )
}


export default ProductCard;