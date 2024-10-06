import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import React from 'react'
import { TbCube } from "react-icons/tb";
import { tv, laptop } from '@/assets/extra/index'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"
import Image, { StaticImageData } from 'next/image';

interface Order {
    id: number;
    status: 'Pending' | 'Delivered' | 'Shipped';
    productName: string;
    description: string;
    price: number;
    quantity: number;
    imageSrc: string | StaticImageData;
}

const ordersData: Order[] = [
    {
        id: 1,
        status: 'Pending',
        productName: 'Samsung 32" LED TV',
        description: 'TCL V6B 139 cm (55 inch) Ultra HD (4K) LED Smart Google TV 2024 Edition with 24W Dolby Audio and Metallic Bezel-Less (55V6B)',
        price: 24999,
        quantity: 1,
        imageSrc: tv,
    },
    {
        id: 2,
        status: 'Delivered',
        productName: 'HP Pavilion Laptop',
        description: 'HP Pavilion Gaming Laptop with 16GB RAM, 512GB SSD, and NVIDIA GTX 1650 Graphics.',
        price: 69999,
        quantity: 1,
        imageSrc: laptop,
    },
    {
        id: 3,
        status: 'Shipped',
        productName: 'Apple MacBook Air',
        description: 'Apple MacBook Air with M1 Chip, 8GB RAM, 256GB SSD - Silver.',
        price: 92999,
        quantity: 1,
        imageSrc: tv,
    }
]
// Status badge color logic
const getBadgeColor = (status: string) => {
    switch (status) {
        case 'Pending':
            return 'bg-red-400';
        case 'Delivered':
            return 'bg-green-400';
        case 'Shipped':
            return 'bg-blue-400';
        default:
            return 'bg-gray-400';
    }
}


const OrdersPage = () => {
    return (
        <div className='space-y-7'>
            <div className='w-full flex items-center justify-between'>
                <Label className='text-lg font-semibold'> Track All your Orders</Label>
                <SelectOrderStatus />
            </div>
            {ordersData.map(order => (
                <OrderCard key={order.id} order={order} />
            ))}
        </div>
    )
}
// Define props for OrderCard
interface OrderCardProps {
    order: Order;
}

const OrderCard: React.FC<OrderCardProps> = ({ order }) => {
    return (
        <div className='bg-white p-4 flex flex-col gap-y-7 border rounded-md'>
            <div className='flex gap-x-3 items-center'>
                <div className='size-10 aspect-square bg-[#eaf5f3] rounded-full flex items-center justify-center'>
                    <TbCube className='size-6 text-primary' />
                </div>
                <div>
                    <div className='flex items-center gap-x-2'>
                        <Label className='text-lg font-semibold'>{order.productName}</Label>
                        <Badge className={`${getBadgeColor(order.status)}`}>{order.status}</Badge>
                    </div>
                    <Label className='text-sm'>{order.description}</Label>
                </div>
            </div>
            <ProductDetailsCard order={order} />
        </div>
    )
}


interface ProductDetailsCardProps {
    order: Order;
}

const ProductDetailsCard: React.FC<ProductDetailsCardProps> = ({ order }) => {
    return (
        <Card className="w-full cursor-pointer hover:opacity-90 duration-200 group ">
            <CardContent className='flex items-start gap-x-3'>
                <div className='w-full max-w-72'>
                    <Image
                        src={order.imageSrc}
                        alt={order.productName}
                        width={280}
                        height={300}
                    />
                </div>
                <CardHeader>
                    <Label className='text-lg font-semibold'>{order.productName}</Label>
                    <CardDescription className='group-hover:underline'>{order.description}</CardDescription>
                    <Label className='text-lg text-primary font-semibold'>₹ {order.price}</Label>
                    <Label className=' text-gray-500'>Quantity: <strong className='text-primary'>{order.quantity}</strong></Label>
                </CardHeader>
            </CardContent>
        </Card>
    )
}


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const SelectOrderStatus = () => {
    return (
        <Select defaultValue='pending'>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Order Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="delevered">Delevered</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}


export default OrdersPage;