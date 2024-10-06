import Image, { StaticImageData } from 'next/image';
import { Label } from '@/components/ui/label';

const OrderCard = ({ image, name = "" }: { image: StaticImageData, name?: string }) => {
    return (
        <div className='bg-white space-y-2 shadow-md p-3 rounded-lg border flex flex-col items-start gap-x-3 justify-start'>
            <Image
                src={image}
                className="max-h-20 rounded-md object-contain"
                height="300"
                width="300"
                alt="Product"
            />
            <Label>{name}</Label>
        </div>
    );
};

export default OrderCard;
