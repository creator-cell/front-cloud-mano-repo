import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"


interface CustomDrawerProps {
    title: string;
    description: string;
}

const CustomDrawer: React.FC<CustomDrawerProps> = () => {


    const sortOptions = [
        { label: 'Ascending', value: 'asc' },
        { label: 'Descending', value: 'desc' },
        { label: 'By Price', value: 'price' },
        { label: 'By Rating', value: 'rating' }
    ];
    return (
        <Drawer>
            <DrawerTrigger>Sort</DrawerTrigger>
            <DrawerContent className="px-6">
                <RadioGroup >
                    {sortOptions.map((option) => (
                        <div key={option.value} className="flex items-center mb-2">
                            <RadioGroupItem id={option.value} value={option.value} />
                            <label htmlFor={option.value} className="ml-2 text-sm">{option.label}</label>
                        </div>
                    ))}
                </RadioGroup>
            </DrawerContent>
        </Drawer>
    );
};


export default CustomDrawer;
