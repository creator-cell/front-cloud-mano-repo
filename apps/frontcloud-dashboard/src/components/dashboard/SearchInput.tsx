"use client";
import { dashboard_searchInput_schema, DashboardSearchInputSchema } from '@/zod/dashboard_searchInput_schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Plus, Search } from 'lucide-react'

const SearchInput = () => {
    const [isTyping, setIsTyping] = useState(false);

    const form = useForm<DashboardSearchInputSchema>({
        resolver: zodResolver(dashboard_searchInput_schema),
    });

    const onSubmit = (values: DashboardSearchInputSchema) => {
        console.log(values);
        form.reset();
        setIsTyping(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsTyping(e.target.value.length > 0);
        form.setValue('search', e.target.value);
    };

    return (
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-3 items-center">
            <Search />
            <Input
                {...form.register('search')}
                onChange={handleInputChange}
                className="border-none bg-transparent h-8 placeholder:text-gray-100 ring-1 ring-primary"
                placeholder="Search to navigate to..."
            />
            {isTyping && <Plus className='rotate-45 cursor-pointer' onClick={() => { form.reset(); setIsTyping(false) }} />}
        </form>
    );
};

export default SearchInput;
