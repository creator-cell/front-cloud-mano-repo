import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function NotFound() {
    return (
        <div className='bg-black w-screen h-screen inset-0 text-white flex items-center justify-center'>
            <div className='flex flex-col justify-center items-center gap-y-8'>
                <h2>Not Found</h2>
                <p>Could not find requested resource</p>
                <Button asChild>
                    <Link href="/dashboard">Return Home</Link>
                </Button>
            </div>
        </div>
    )
}