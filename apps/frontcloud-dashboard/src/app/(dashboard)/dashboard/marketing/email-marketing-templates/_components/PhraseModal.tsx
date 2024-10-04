"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { CirclePlus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import DialogModal from '@/components/common/DialogModal';
import { Form } from '@/components/ui/form';
import CustomFormField from '@/components/common/CustomFormField';
import { FormFieldType } from '@/enum/formTypes';

const PhraseModal: React.FC = () => {
    const form = useForm<any>({ mode: 'all' });

    const onSubmit = (data: any) => {
        console.log('Form data:', data);
    };

    return (
        <DialogModal
            triggerLabel={
                <Button className='w-fit self-end'>
                    <CirclePlus size={16} className='mr-2' />
                    Add Phrase
                </Button>
            }
            title='Add Phrase'
            confirmLabel='Add'
            cancelLabel='Cancel'
            onConfirm={form.handleSubmit(onSubmit)}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
                    <div className='grid grid-cols-2 gap-x-5'>
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name='label'
                            control={form.control}
                            placeholder='Label'
                            label='Phrase Name'
                            className='ring-1 ring-gray-300'
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name='value'
                            control={form.control}
                            placeholder='Value'
                            label='Phrase Value'
                            className='ring-1 ring-gray-300'
                        />
                    </div>
                </form>
            </Form>
        </DialogModal>
    );
};

export default PhraseModal;
