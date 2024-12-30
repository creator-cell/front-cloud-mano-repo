"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import Image, { StaticImageData } from "next/image";


interface CartCardProps {
    product: {
        name: string;
        image: string;
        price: number;
        discountedPrice: number;
        discount: number;
        packagingFee: number;
    };
    deliveryInfo: {
        date: string;
        cost: string;
    };
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
    onRemove: () => void;
}

const CartCard: React.FC<CartCardProps> = ({
    product,
    deliveryInfo,
    quantity,
    onQuantityChange,
    onRemove,
}) => {
    const { name, image, price, discountedPrice, discount, packagingFee } = product;
    const { date, cost } = deliveryInfo;

    return (
        <Card className="border p-4 rounded-md ">
            <div className="grid grid-cols-7 items-start gap-6">
                <div className="col-span-7 flex items-start gap-x-3">
                    <Image
                        src={image}
                        alt={name}
                        width={100}
                        height={300}
                        className="rounded-md"
                    />
                    <div>
                        <CardHeader>
                            <CardTitle className="text-sm md:text-sm font-[400] truncate line-clamp-1">
                                {name}
                            </CardTitle>
                        </CardHeader>
                        <div className="pt-6 space-x-2">
                            <Label className="text-sm line-through text-gray-600 ">
                                ₹{price.toLocaleString("en-IN")}
                            </Label>
                            <Label className="font-bold text-base">
                                ₹{discountedPrice.toLocaleString("en-IN")}
                            </Label>
                            <Label className="text-sm text-primary">{discount}% Off</Label>
                        </div>
                        <div className="text-xs">
                            + ₹{packagingFee} Secured Packaging Fee
                        </div>
                    </div>
                </div>
                {/* <div className="col-span-1">
                    <Label className="text-xs whitespace-nowrap">
                        Delivery by {date} | {cost}
                    </Label>
                </div> */}
            </div>

            <CardFooter className="flex justify-start p-0 gap-5 mt-7">
                <div className="flex items-center gap-4">
                    <Button variant="outline" onClick={() => onQuantityChange(Math.max(1, quantity - 1))}>
                        <Minus size={18} />
                    </Button>
                    <Input
                        type="number"
                        value={quantity}
                        onChange={(e) => onQuantityChange(Number(e.target.value))}
                        className="w-16"
                        min={1}
                    />
                    <Button variant="outline" onClick={() => onQuantityChange(quantity + 1)}>
                        <Plus size={18} />
                    </Button>
                </div>
                <Button
                    variant={"ghost"}
                    className="uppercase font-semibold tracking-wide"
                    onClick={onRemove}
                >
                    Remove
                </Button>
            </CardFooter>
        </Card>
    );
};

export default CartCard;
