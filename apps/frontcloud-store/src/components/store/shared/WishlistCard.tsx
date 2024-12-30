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
import { Heart, Plus, X } from "lucide-react";
import { WishlistItem } from "@/Redux/api/user/types/wishlist.types";
import { Media } from "@/Redux/api/user/types/cart.types";



interface ProductCardProps {
    product: WishlistItem
}


const WishlistCard: React.FC<ProductCardProps> = ({
    product: { Product: { ProductName: title, StorePrice: price, Discount: discountPrice, Media } }
}) => {
    const router = useRouter()

    // Function to get the first image URL from the media array
    function getImageURL(): string | null {
        const imageMedia = Media.find((media) => media.MediaType === "Image");
        return imageMedia ? imageMedia.MediaUrl : null;
    }


    return (
        <Card
            className="w-full border p-4 pb-0 border-primary rounded-md cursor-pointer space-y-3 relative">
            <Button className='size-6 rounded-full p-0 bg-store-primary hover:bg-store-primary  absolute top-1 right-1'>
                <X size={20} className='' />
            </Button>
            <CardContent onClick={() => router.push('/store/1')} className='mt-2 space-y-1'>
                <CardHeader className="pb-4">
                    <Image
                        src={getImageURL() ?? productImg}
                        alt="product"
                        width={150}
                        height={300}
                        className="rounded-md"
                    />
                </CardHeader>

                <CardDescription className='text-primary'>category</CardDescription>
                <CardTitle className='text-base whitespace-nowrap truncate '>{title}</CardTitle>

            </CardContent>
            <CardFooter className="p-0 flex flex-col justify-start items-start pb-4 ">
                <div className='mt-3'>
                    <Label>Price</Label>
                    <div className='flex items-center gap-2'>
                        <CardDescription className='text-primary whitespace-nowrap'>₹ {price}</CardDescription>
                        <CardDescription className='text-red-500 line-through whitespace-nowrap'>₹ {discountPrice}</CardDescription>

                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}


export default WishlistCard;