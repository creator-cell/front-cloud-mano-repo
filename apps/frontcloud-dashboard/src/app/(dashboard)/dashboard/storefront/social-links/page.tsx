"use client";
import React, { useEffect, useState } from 'react';
import PageWrapper from '../../_components/PageWrapper';
import SectionLayout from '@/components/common/CommonSectionLayout';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import socialLinksSchema, { SocialLinks } from '@/zod/storefront/social-links.schema';
import { Form } from '@/components/ui/form';
import CustomFormField from '@/components/common/CustomFormField';
import { FormFieldType } from '@/enum/formTypes';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Grip } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ActionBarLayout from '@/components/common/CommonActionBarLayout';
import { useGetAllSocialLinksQuery, usePostSocialLinksMutation } from '@/store/api/storefront';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const SocialLinkPage = () => {

    const router = useRouter()
    const { data: SocialLinks } = useGetAllSocialLinksQuery()
    console.log("🚀 ~ SocialLinkPage ~ data:", SocialLinks)

    const form = useForm<SocialLinks>({
        resolver: zodResolver(socialLinksSchema),
        mode: "all",
    });
    const {
        control,
        handleSubmit,
        setValue,
        formState: { errors },
    } = form;

    useEffect(() => {
        setValue('facebookUrl', SocialLinks?.data?.[0]?.FaceBookURL)
        setValue('twitterUrl', SocialLinks?.data?.[0]?.TwitterURL)
        setValue('linkedinUrl', SocialLinks?.data?.[0]?.LinkedinURL)
        setValue('instagramUrl', SocialLinks?.data?.[0]?.InstagramURL)
        setValue('youtubeUrl', SocialLinks?.data?.[0]?.YoutubeURL)
        setValue('githubUrl', SocialLinks?.data?.[0]?.GithubURL)
        setValue('tiktokUrl', SocialLinks?.data?.[0]?.TiktokURL)
        setValue('pinterestUrl', SocialLinks?.data?.[0]?.PinterestURL)
        setValue('snapchatUrl', SocialLinks?.data?.[0]?.SnapchatURL)
    }, [SocialLinks])

    const [fields, setFields] = useState<string[]>(Object.keys(socialLinksSchema.shape));


    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const reorderedFields = Array.from(fields);
        const [movedField] = reorderedFields.splice(result.source.index, 1);
        reorderedFields.splice(result.destination.index, 0, movedField);

        setFields(reorderedFields);
    };

    const [PostSocialLinks, { isLoading }] = usePostSocialLinksMutation()

    const onSubmit = async (data: SocialLinks) => {
        console.log("Form data:", data);

        const Data = { ...data, storeId: "1" }
        const promise = PostSocialLinks(Data).unwrap();

        toast.promise(promise, {
            loading: 'Saving...',
            success: 'Social Links saved successfully',
            error: 'Failed to save Social Links'
        })
        try {
            await promise;
            router.refresh();
        } catch (e) {
            console.error(e)
        }

    };

    return (
        <PageWrapper>
            <SectionLayout title='Social Links'>
                <Form {...form}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {fields.map((field, index) => (
                                            <Draggable key={field} draggableId={field} index={index}>
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className="bg-white border border-gray-300 flex items-center gap-x-5 divide-x-2 rounded-md p-4 mb-2 shadow-sm w-full"
                                                    >
                                                        <Grip className="w-6 h-6 text-gray-500" />
                                                        <div className='w-full pl-4'>

                                                            <CustomFormField
                                                                fieldType={FormFieldType.INPUT}
                                                                name={field as keyof SocialLinks}
                                                                control={control}
                                                                placeholder={`Enter ${field.charAt(0).toUpperCase() + field.slice(1)} URL`}
                                                                label={`${field.charAt(0).toUpperCase() + field.slice(1)} URL`}
                                                                className="ring-1 ring-gray-300 rounded-md  w-full"
                                                            />
                                                        </div>
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))}

                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </DragDropContext>
                        <ActionBarLayout>
                            <Button variant={"outline"} type='button' className='px-5'  >Calcle</Button>
                            <Button disabled={isLoading} className='px-4'>Save</Button>
                        </ActionBarLayout>
                    </form>
                </Form>
            </SectionLayout>
        </PageWrapper>
    );
}

export default SocialLinkPage;
