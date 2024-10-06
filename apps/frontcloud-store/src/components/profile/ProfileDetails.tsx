import { Label } from '@/components/ui/label';
import Image from 'next/image';

const image = "https://images.unsplash.com/photo-1554080353-a576cf803bda?auto=format&fit=crop&w=3387&q=80";

const ProfileDetails = () => {
    return (
        <div className='relative flex flex-col justify-between'>
            <Image
                src={image}
                className="w-full max-h-40 rounded-md object-cover"
                height="400"
                width="500"
                alt="Profile cover"
            />
            <div className='size-32 rounded-full text-black shadow-lg bg-gray-300 absolute left-1/2 -translate-x-1/2 bottom-16'></div>
            <div className='flex flex-col items-center pt-16'>
                <Label className='text-xl font-bold'>John Doe</Label>
                <Label className='text-sm truncate'>Johndoe@gmail.com</Label>
            </div>
        </div>
    );
};

export default ProfileDetails;
