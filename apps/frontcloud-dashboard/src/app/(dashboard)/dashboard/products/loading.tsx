import { Loader } from 'lucide-react';
export default function Loading() {
    // Or a custom loading skeleton component
    return <div className='size-full flex items-center justify-center'>
        <Loader size={64} className='animate-spin text-black' />
    </div>
}
