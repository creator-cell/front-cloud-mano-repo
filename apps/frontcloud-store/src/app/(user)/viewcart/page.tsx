"use client";

import CartCard from '@/components/store/CartCard';
import React from 'react'

import { tv, laptop } from '@/assets/extra';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useGetAllCartItemsQuery } from '@/Redux/api/user';
import { Media } from '@/Redux/api/user/types/cart.types';
import { calculateOrderSummary } from '@/utils/CalculateOrderSummery';

const ViewCartPage = () => {

    const { data } = useGetAllCartItemsQuery()
    console.log("🚀 ~ ViewCartPage ~ data:", data)

    // Function to get the first image URL from the media array
    function getImageURL(mediaArray: Media[]): string | null {
        const imageMedia = mediaArray.find((media) => media.MediaType === "Image");
        return imageMedia ? imageMedia.MediaURL : null;
    }

    const orderSummary = calculateOrderSummary(data?.Data?.[0]?.CartItem ?? []);
    console.log("🚀 ~ ViewCartPage ~ orderSummary:", orderSummary)


    return (
        <div className='container sm:px-0 flex flex-col gap-y-4 py-8 relative'>
            <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-2 space-y-4 '>

                    {
                        data && data?.Data && data?.Data?.[0]?.CartItem && data.Data?.[0]?.CartItem?.map((item, index) => (
                            <CartCard
                                key={index}
                                product={{
                                    name: item.Product.ProductName,
                                    image: getImageURL(item.Product.Media) ?? "",
                                    price: Number(item.TotalPrice),
                                    discountedPrice: Number(item.Price),
                                    discount: Number(item.Discount),
                                    packagingFee: 99,
                                }}
                                deliveryInfo={{
                                    date: "",
                                    cost: "",
                                }}
                                quantity={item.Quantity}
                                onQuantityChange={(newQuantity) => console.log("New Quantity:", newQuantity)}
                                onRemove={() => console.log("Remove product")}
                            />
                        ))
                    }

                </div>
                <div className='col-span-1 relative'>
                    <div className='sticky inset-0 min-h-[40vh] bg-white border top-24 px-4 py-2 divide-y'>
                        <div className='pb-3'>
                            <Label className='text-base uppercase text-gray-500 font-semibold pb-3'>Order Summary</Label>
                        </div>

                        <div className='py-4 space-y-5'>
                            <div className='flex justify-between'>
                                <Label className='text-sm'>Price ({data?.Data?.[0]?.CartItem.length ?? 0} items)</Label>
                                <Label className='font-semibold'>{orderSummary.price}</Label>
                            </div>
                            <div className='flex justify-between'>
                                <Label className='text-sm'>Discount</Label>
                                <Label className='text-red-600'>− {orderSummary.discount}</Label>
                            </div>
                            <div className='flex justify-between'>
                                <Label className='text-sm'>Delivery Charges</Label>
                                <Label className='font-semibold text-green-600'><span className='line-through'>{orderSummary.deliveryCharges}</span>  Free</Label>
                            </div>
                            <div className='flex justify-between'>
                                <Label className='text-sm'>Secured Packaging Fee</Label>
                                <Label className='font-semibold'>{orderSummary.packagingFee}</Label>
                            </div>
                        </div>

                        <div className='pt-4 divide-y'>
                            <div className='flex justify-between pb-3'>
                                <Label className='text-base font-semibold'>Total Amount</Label>
                                <Label className='font-semibold'>{orderSummary.totalAmount}</Label>
                            </div>
                            <div className='text-green-600 pt-2'>
                                <Label className='text-sm font-semibold'>
                                    You will save {orderSummary.savings} on this order
                                </Label>
                            </div>
                        </div>
                        <div className='pt-6'>
                            <Button className=' w-full '>Proceed to Checkout</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewCartPage
