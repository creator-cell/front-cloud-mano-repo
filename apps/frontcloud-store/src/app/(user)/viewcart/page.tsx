"use client";

import CartCard from '@/components/store/CartCard';
import React from 'react'

import { tv, laptop } from '@/assets/extra';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const ViewCartPage = () => {
    return (
        <div className='container flex flex-col gap-y-4 py-8 relative'>
            <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-2 space-y-4 '>
                    <CartCard
                        product={{
                            name: "SAMSUNG Galaxy S23 Ultra 5G (Green, 256 GB)",
                            image: tv,
                            price: 149999,
                            discountedPrice: 89999,
                            discount: 40,
                            packagingFee: 99,
                            seller: "VTechMart",
                            ram: "12 GB",
                        }}
                        deliveryInfo={{
                            date: "Sun Oct 20",
                            cost: "₹40Free",
                        }}
                        quantity={1}
                        onQuantityChange={(newQuantity) => console.log("New Quantity:", newQuantity)}
                        onRemove={() => console.log("Remove product")}
                    />
                    <CartCard
                        product={{
                            name: "SAMSUNG Galaxy S23 Ultra 5G (Green, 256 GB)",
                            image: laptop,
                            price: 149999,
                            discountedPrice: 89999,
                            discount: 40,
                            packagingFee: 99,
                            seller: "VTechMart",
                            ram: "12 GB",
                        }}
                        deliveryInfo={{
                            date: "Sun Oct 20",
                            cost: "₹40Free",
                        }}
                        quantity={1}
                        onQuantityChange={(newQuantity) => console.log("New Quantity:", newQuantity)}
                        onRemove={() => console.log("Remove product")}
                    />
                    <CartCard
                        product={{
                            name: "SAMSUNG Galaxy S23 Ultra 5G (Green, 256 GB)",
                            image: laptop,
                            price: 149999,
                            discountedPrice: 89999,
                            discount: 40,
                            packagingFee: 99,
                            seller: "VTechMart",
                            ram: "12 GB",
                        }}
                        deliveryInfo={{
                            date: "Sun Oct 20",
                            cost: "₹40Free",
                        }}
                        quantity={1}
                        onQuantityChange={(newQuantity) => console.log("New Quantity:", newQuantity)}
                        onRemove={() => console.log("Remove product")}
                    />
                    <CartCard
                        product={{
                            name: "SAMSUNG Galaxy S23 Ultra 5G (Green, 256 GB)",
                            image: laptop,
                            price: 149999,
                            discountedPrice: 89999,
                            discount: 40,
                            packagingFee: 99,
                            seller: "VTechMart",
                            ram: "12 GB",
                        }}
                        deliveryInfo={{
                            date: "Sun Oct 20",
                            cost: "₹40Free",
                        }}
                        quantity={1}
                        onQuantityChange={(newQuantity) => console.log("New Quantity:", newQuantity)}
                        onRemove={() => console.log("Remove product")}
                    />
                    <CartCard
                        product={{
                            name: "SAMSUNG Galaxy S23 Ultra 5G (Green, 256 GB)",
                            image: laptop,
                            price: 149999,
                            discountedPrice: 89999,
                            discount: 40,
                            packagingFee: 99,
                            seller: "VTechMart",
                            ram: "12 GB",
                        }}
                        deliveryInfo={{
                            date: "Sun Oct 20",
                            cost: "₹40Free",
                        }}
                        quantity={1}
                        onQuantityChange={(newQuantity) => console.log("New Quantity:", newQuantity)}
                        onRemove={() => console.log("Remove product")}
                    />
                    <CartCard
                        product={{
                            name: "SAMSUNG Galaxy S23 Ultra 5G (Green, 256 GB)",
                            image: laptop,
                            price: 149999,
                            discountedPrice: 89999,
                            discount: 40,
                            packagingFee: 99,
                            seller: "VTechMart",
                            ram: "12 GB",
                        }}
                        deliveryInfo={{
                            date: "Sun Oct 20",
                            cost: "₹40Free",
                        }}
                        quantity={1}
                        onQuantityChange={(newQuantity) => console.log("New Quantity:", newQuantity)}
                        onRemove={() => console.log("Remove product")}
                    />
                    <CartCard
                        product={{
                            name: "SAMSUNG Galaxy S23 Ultra 5G (Green, 256 GB)",
                            image: laptop,
                            price: 149999,
                            discountedPrice: 89999,
                            discount: 40,
                            packagingFee: 99,
                            seller: "VTechMart",
                            ram: "12 GB",
                        }}
                        deliveryInfo={{
                            date: "Sun Oct 20",
                            cost: "₹40Free",
                        }}
                        quantity={1}
                        onQuantityChange={(newQuantity) => console.log("New Quantity:", newQuantity)}
                        onRemove={() => console.log("Remove product")}
                    />

                </div>
                <div className='col-span-1 relative'>
                    <div className='sticky inset-0 min-h-[40vh] bg-white border top-24 px-4 py-2 divide-y'>
                        <div className='pb-3'>
                            <Label className='text-base uppercase text-gray-500 font-semibold pb-3'>Order Summary</Label>
                        </div>

                        <div className='py-4 space-y-5'>
                            <div className='flex justify-between'>
                                <Label className='text-sm'>Price (3 items)</Label>
                                <Label className='font-semibold'>₹1,55,999</Label>
                            </div>
                            <div className='flex justify-between'>
                                <Label className='text-sm'>Discount</Label>
                                <Label className='text-red-600'>− ₹62,601</Label>
                            </div>
                            <div className='flex justify-between'>
                                <Label className='text-sm'>Delivery Charges</Label>
                                <Label className='font-semibold text-green-600'><span className='line-through'>₹40</span>  Free</Label>
                            </div>
                            <div className='flex justify-between'>
                                <Label className='text-sm'>Secured Packaging Fee</Label>
                                <Label className='font-semibold'>₹99</Label>
                            </div>
                        </div>

                        <div className='pt-4 divide-y'>
                            <div className='flex justify-between pb-3'>
                                <Label className='text-base font-semibold'>Total Amount</Label>
                                <Label className='font-semibold'>₹93,497</Label>
                            </div>
                            <div className='text-green-600 pt-2'>
                                <Label className='text-sm font-semibold'>
                                    You will save ₹62,502 on this order
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
