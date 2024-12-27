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
import { StoreProductType } from "@/Redux/api/store/types/store.types";
import { calculateDiscountedPrice } from "@/utils/calculateDiscountedProductPrice";
import { useAddToCartMutation, useAddToWishListMutation, useGetUserQuery } from "@/Redux/api/user";
import { useAppSelector } from "@/Redux/hooks";
import { toast } from "sonner";


interface ProductCardProps {
    card: StoreProductType
}


const ProductCard: React.FC<ProductCardProps> = ({
    card: { ProductName, StorePrice, DiscountType, Discount, rating, MediaURL, ProductID }
}) => {
    const router = useRouter()

    const [AddToCart] = useAddToCartMutation()
    const [AddToWishList] = useAddToWishListMutation()


    const { data: User } = useGetUserQuery()
    console.log("🚀 ~ User:", User)

    const handleAddToWishList = async () => {
        try {
            if (!User || !User.Data || !User?.Data?.UserID || !ProductID) {
                toast.error('Please login to add to cart')
                return;
            }

            const promise = AddToWishList({
                ProductId: ProductID,
                UserId: User.Data.UserID,
                StoreId: 1
            })


            toast.promise(promise, {
                loading: 'Adding to wishlist',
                success: 'Added to wishlist',
                error: 'Failed to add to wishlist'
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleAddtoCart = async () => {
        try {
            if (!User || !User.Data || !User?.Data?.UserID || !ProductID) {
                toast.error('Please login to add to cart')
                return;
            }

            const promise = AddToCart({
                ProductId: ProductID,
                Quantity: 1,
                UserId: User.Data.UserID,
                StoreId: 1
            }).unwrap()


            toast.promise(promise, {
                loading: 'Adding to cart',
                success: 'Added to cart',
                error: 'Failed to add to cart'
            })
        } catch (error) {
            console.log(error)
        }
    }

    const disCountedPrice = calculateDiscountedPrice(Number(StorePrice), DiscountType, Discount)
    return (
        <Card
            className="w-full border p-4 pb-0 border-primary rounded-md cursor-pointer space-y-3 relative">
            <Button variant={"ghost"} className='absolute top-0 right-2 hover:bg-transparent'>
                <CiHeart size={25} onClick={handleAddToWishList} />
            </Button>
            <CardContent onClick={() => router.push('/shop/1')} className='mt-2 space-y-1'>
                <CardHeader className="h-72">
                    <Image
                        src={MediaURL ?? ""}
                        alt="product"
                        width={300}
                        height={300}
                        className="rounded-md h-full"
                    />
                </CardHeader>

                <RatingStar rating={rating} />
                <CardTitle className='text-base whitespace-nowrap truncate '>{ProductName}</CardTitle>

            </CardContent>
            <CardFooter className="p-0 flex justify-between items-end pb-4 ">
                <div className='mt-3'>
                    <Label>Price</Label>
                    <div className='flex items-center gap-2'>
                        <CardDescription className='text-primary whitespace-nowrap'>₹ {disCountedPrice}</CardDescription>
                        <CardDescription className='text-red-500 line-through whitespace-nowrap'>₹ {StorePrice}</CardDescription>

                    </div>
                </div>
                <Button
                    onClick={handleAddtoCart}
                    className='size-10 p-0 bg-store-primary hover:bg-store-primary'>
                    <Plus size={25} className='' />
                </Button>
            </CardFooter>
        </Card>
    )
}


export default ProductCard;