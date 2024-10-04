"use client";

import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CustomHeading } from '@/components/custom/CustomHeading'
import { FormLabel } from '@/components/ui/form';
import { CircleCheck } from 'lucide-react';
interface Plan {
    name: string;
    description: string;
    price_per_month?: number;
    online_revenue_limit: number;
    features: string[];
    custom_pricing?: boolean; // optional property for Enterprise plan
}

const data: Plan[] = [
    {
        name: "Starter",
        description: "For individuals and small brands",
        price_per_month: 60,
        online_revenue_limit: 53000,
        features: [
            "sell on amazon",
            "sell on snapchat",
            "sell on TikTok",
            "sell on Instagram",
            "dropshipping 150 products",
            "AI Features"
        ]
    },
    {
        name: "Plus",
        description: "For ambitious small businesses",
        price_per_month: 94,
        online_revenue_limit: 160000,
        features: [
            "sell on amazon",
            "sell on snapchat",
            "sell on TikTok",
            "sell on Instagram",
            "dropshipping 400 products",
            "AI Features",
            "Free iOS or Android App on yearly plan"
        ]
    },
    {
        name: "Pro",
        description: "For fast-growing businesses",
        price_per_month: 126,
        online_revenue_limit: 400000,
        features: [
            "sell on amazon",
            "sell on snapchat",
            "sell on TikTok",
            "sell on Instagram",
            "dropshipping Unlimited products",
            "AI Features",
            "Free iOS and Android App on yearly plan"
        ]
    },
    {
        name: "Enterprise",
        description: "For established businesses",
        online_revenue_limit: 400000,
        features: [
            "Best for $400k+ online revenue",
            "sell on amazon",
            "sell on snapchat",
            "sell on TikTok",
            "sell on Instagram",
            "dropshipping Unlimited products",
            "AI Features"
        ]
    }
]


const PricingPage = () => {
    return (
        <div>
            <div className='bg-gradient-to-b from-white from-[2%] via-primary to-primary min-h-screen inset-0 '>
                <div className='container py-10 space-y-36'>
                    <CustomHeading variant={"small"} className='text-black text-3xl'>Plans and prices list</CustomHeading>
                    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 '>
                        {
                            data.map((item, index) => (
                                <PricingCard key={item.name} plan={item} />
                            ))

                        }
                    </div>
                    <div className='pb-12'>
                        <div className='bg-white'>
                            <PricingTable />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PricingPage




interface PricingCardProps {
    plan: Plan;
}



const PricingCard: React.FC<PricingCardProps> = ({
    plan: { name, description, price_per_month, online_revenue_limit, features, custom_pricing }
}) => {
    return (
        <Card className="w-full px-6 pt-8  rounded-xl shadow-lg flex flex-col justify-between cursor-pointer">
            <CardHeader className='py-12'>
                <CardTitle className='text-4xl'>{name}</CardTitle>
                <CardDescription>{description}</CardDescription>
                <Label className='text-2xl my-3 font-bold'>${price_per_month}/mo</Label>
            </CardHeader>
            <CardContent>
                <Label>Features</Label>
                <ul className=" list-inside">
                    {features.map((feature, index) => (
                        <div className='flex items-start gap-x-1 py-2'>
                            <CircleCheck color='white' fill='green' size={20} />
                            <li key={index} className='text-gray-500 text-sm'>  {feature}</li>
                        </div>
                    ))}
                </ul>

            </CardContent>
            <CardFooter className='pt-5 mb-5'>
                <Button className='w-full' >Choose Plan</Button>
            </CardFooter>
        </Card>
    )
}

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const PricingTable = () => {
    return (
        <Table >
            <TableHeader >
                <TableRow className='bg-black hover:bg-black '>
                    <TableHead className='text-white'> Included in all plans</TableHead>
                    <TableHead className='text-white'>Standard</TableHead>
                    <TableHead className='text-white'>Plus</TableHead>
                    <TableHead className='text-white'>Pro</TableHead>
                    <TableHead className='text-white'>Enterprise</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {/* Included in all plans */}
                <TableRow>
                    <TableCell>Products, file storage, and bandwidth</TableCell>
                    <TableCell >Unlimited</TableCell>
                    <TableCell>Unlimited</TableCell>
                    <TableCell>Unlimited</TableCell>
                    <TableCell>Unlimited</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Staff accounts</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>Unlimited</TableCell>
                    <TableCell>Unlimited</TableCell>
                    <TableCell>Unlimited</TableCell>
                </TableRow>

                {/* Sales Channels */}
                <TableRow>
                    <TableHead colSpan={5}>Sales Channels</TableHead>
                </TableRow>
                <TableRow>
                    <TableCell>Online Storefront</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Multi-Storefront</TableCell>
                    <TableCell>1</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>3</TableCell>
                    <TableCell>Contact</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Price per additional storefront</TableCell>
                    <TableCell>30</TableCell>
                    <TableCell>50</TableCell>
                    <TableCell>70</TableCell>
                    <TableCell>Contact</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Point of sale</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Amazon</TableCell>
                    <TableCell></TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Facebook / Instagram</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Snapchat</TableCell>
                    <TableCell></TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>TikTok</TableCell>
                    <TableCell></TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Drop Shipping</TableCell>
                    <TableCell>150 products</TableCell>
                    <TableCell>400 products</TableCell>
                    <TableCell>Unlimited</TableCell>
                    <TableCell>Unlimited</TableCell>
                </TableRow>

                {/* Features */}
                <TableRow>
                    <TableHead colSpan={5}>Features</TableHead>
                </TableRow>
                <TableRow>
                    <TableCell>Mobile responsive website</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Front Cloud mobile app</TableCell>
                    <TableCell></TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Single-page checkout</TableCell>
                    <TableCell></TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Apple Pay, Google Pay, Amazon Pay</TableCell>
                    <TableCell></TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Coupons, discounts, and gift cards</TableCell>
                    <TableCell></TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Multi-Currency</TableCell>
                    <TableCell></TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Real-time shipping quotes</TableCell>
                    <TableCell></TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Professional reporting tools</TableCell>
                    <TableCell></TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Built-in blog</TableCell>
                    <TableCell></TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Product ratings and reviews</TableCell>
                    <TableCell></TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Free Sitewide HTTPs and Dedicated SSL</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Abandoned cart saver</TableCell>
                    <TableCell></TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Persistent Cart</TableCell>
                    <TableCell></TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Stored credit cards</TableCell>
                    <TableCell></TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Google customer reviews</TableCell>
                    <TableCell></TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Product filtering</TableCell>
                    <TableCell></TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Custom product filtering</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Price Lists</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Inventory locations</TableCell>
                    <TableCell>2</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>6</TableCell>
                    <TableCell>Custom</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Brand App (on yearly plan only)</TableCell>
                    <TableCell>X</TableCell>
                    <TableCell>ISO or Android</TableCell>
                    <TableCell>ISO and Android</TableCell>
                    <TableCell>Custom</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>All Features</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                    <TableCell className='text-green-400'>✓</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Online sales per year</TableCell>
                    <TableCell>Up to 200K</TableCell>
                    <TableCell>Up to 600K</TableCell>
                    <TableCell>Up to 1.5M</TableCell>
                    <TableCell>1.5M and above</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}



