import LoginForm from '@/components/LoginForm'
import React from 'react'

const page = () => {
    return (
        <div className='inset-0 h-screen w-screen bg-black flex items-center justify-center'>
            <div className='max-w-[20rem] w-full'>
                <LoginForm title='Login To your Store' />
            </div>
        </div>
    )
}

export default page
