"use client"
import React from 'react'

import PodcastImages from "@/assets/podcasts/index"
import Image from 'next/image'
import { Button } from '@/components/ui/button'

import PodcastsContent from "@/enum/main/podcasts.json"
import { cn } from '@/lib/utils'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import CustomFormField from '@/components/common/CustomFormField'
import { FormFieldType } from '@/enum/formTypes'
import { SubscribeFormValues, subscribeSchema } from '@/zod/podcast-subscribe.schema'



const PodcastsPage = () => {
    return (
        <div className='bg-black text-white'>
            <div className='bg-gradient-to-t from-primary to-[#4EB9C8] md:h-[90vh] text-white '>
                <SectionWrapper className='  grid grid-cols-1 sm:grid-cols-2 items-center'  >
                    <div className='space-y-6 '>
                        <div>
                            <Image src={PodcastImages.heroTopImg} alt='heroImg' width={200} height={200} />
                        </div>
                        <h1 className='text-[41px] font-bold'>{PodcastsContent["HeroSection"].title}</h1>
                        <p className='text-[20px] font-[300]'> {PodcastsContent["HeroSection"].description} </p>
                        <Button variant={"secondary"} className='tracking-widest uppercase px-7 text-black' >{PodcastsContent["HeroSection"].cta}  </Button>

                    </div>
                    <div>
                        <Image src={PodcastImages.HeroImg} alt='heroImg' width={600} height={600} />
                    </div>
                </SectionWrapper>


            </div>
            <div className='bg-black'>
                <SectionWrapper >
                    <div className='w-full  flex justify-center flex-wrap gap-6'>
                        {
                            PodcastsContent["Platforms"].map((platform, index) => {
                                return (
                                    <Image key={index} src={PodcastImages[platform.url as keyof typeof PodcastImages]} alt={platform.name} width={200} height={100} />
                                )
                            })
                        }
                    </div>
                </SectionWrapper>
            </div>
            <div className='h-px bg-gradient-to-r from-transparent via-primary to-transparent my-3' />
            <div className='bg-black'>
                <SectionWrapper className='space-y-6'>
                    <h1 className='text-[41px] font-bold'>Tune in to the latest</h1>
                    <div className='w-full'>
                        <iframe
                            src="https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp"
                            width="100%"
                            height="380"
                            // allow="encrypted-media"
                            title='spotify'
                            allowFullScreen
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"
                        >
                        </iframe>
                    </div>

                </SectionWrapper>
            </div>
            <div className='h-px bg-gradient-to-r from-transparent via-primary to-transparent my-3' />

            <SectionWrapper className='space-y-6'>
                <h1 className='text-[41px] font-bold'>{PodcastsContent["FeaturedEpisodes"].title}</h1>
                <div className='w-full flex flex-col'>
                    {
                        PodcastsContent["FeaturedEpisodes"].Episodes.map((episode, index) => (
                            <div key={index} className='flex flex-col space-y-16 items-center'>
                                <div className=' w-full flex max-md:flex-col max-md:gap-y-8 items-center justify-between'>
                                    <Image src={PodcastImages.featredImg} alt='heroImg' width={500} height={500} className=' object-cover ' />
                                    <div className='space-y-4 '>
                                        <h1 className='text-[40px] font-bold leading-tight'>{episode.title}</h1>
                                        <p className='text-[20px] font-[300]'>{episode.description}</p>
                                    </div>

                                </div>
                                <iframe
                                    src="https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp"
                                    width="100%"
                                    height="380"
                                    // allow="encrypted-media"
                                    title='spotify'
                                    allowFullScreen
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"
                                >
                                </iframe>
                            </div>
                        ))
                    }
                </div>

            </SectionWrapper>
            <div className='bg-white text-black'>

                <SectionWrapper className='flex gap-x-12'>
                    <div className='w-1/3 space-y-5 max-md:hidden'>
                        <h1 className='text-[41px] font-bold leading-tight'>Expert advice at your fingertips</h1>
                        <p className='text-gray-600 text-lg font-[300]'>Subscribe to our bi-weekly thought leadership newsletter to stay up to date with new episodes and the latest ecommerce insights and strategies.</p>
                    </div>
                    <div className='flex-1 sm:px-24 md:px-6 lg:px-24 pb-24  '>
                        <SubscribeForm />
                    </div>

                </SectionWrapper>
            </div>
            <SectionWrapper className='text-center space-y-12'>
                <div>
                    <Image src={PodcastImages.MakeItBig} alt='footerImg' width={1200} height={200} />
                </div>
                <div className='space-y-5'>
                    <h1 className='font-bold text-[42px]'>Missed our 2022 Make it Big conference?</h1>
                    <Button variant={"secondary"} className='tracking-widest uppercase px-7 text-black' >Watch the replay</Button>
                </div>

            </SectionWrapper>
        </div>
    )
}

export default PodcastsPage

const SectionWrapper = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return (
        <div className={cn(" container py-24 size-full", className)} >
            {children}

        </div>
    )
}

const SubscribeForm = () => {
    const form = useForm<SubscribeFormValues>({
        resolver: zodResolver(subscribeSchema),
        mode: "all"
    });

    const {
        register,
        control,
        watch,
        formState: { errors },
    } = form;

    console.log("errror", errors)
    const onSubmit = (data: any) => {
        console.log("Form data:", data);
    };
    return (
        <div className='shadow-lg p-8'>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <CustomFormField
                        fieldType={FormFieldType.FLOATINGLABELTEXTFIELD}
                        name={"firstName"}
                        control={control}
                        placeholder='First Name'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.FLOATINGLABELTEXTFIELD}
                        name={"lastName"}
                        control={control}
                        placeholder='Last Name'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.FLOATINGLABELTEXTFIELD}
                        name={"phone"}
                        control={control}
                        placeholder='Phone Number'
                    />
                    <CustomFormField
                        fieldType={FormFieldType.FLOATINGLABELTEXTFIELD}
                        name={"buisness_email"}
                        control={control}
                        placeholder='Buisness Email '
                    />
                    <CustomFormField
                        fieldType={FormFieldType.FLOATINGLABELTEXTFIELD}
                        name={"company_name"}
                        control={form.control}
                        placeholder="Company Name"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.FLOATINGLABELTEXTFIELD}
                        name={"store"}
                        control={control}
                        placeholder='Store'
                    />
                    <CustomFormField
                        control={control}
                        fieldType={FormFieldType.SELECT}
                        name="anual_revenue"
                        placeholder="Select Projected Annual Online Revenue"
                        className=' focus:ring-0  '
                        selectOptions={[
                            { label: 'I Have Not Started Selling yet : No Revenue ', value: 'no' },
                            { label: 'Just Started Out : <$50K', value: '<$50K' },
                            { label: 'Building a Buisness : $50K to $250K', value: '$50k-$250k' },
                            { label: 'Growing Buisness : $250K to $1M', value: '$250k-$1M' },
                            { label: 'Maturing Buisness : $1M to $20M', value: '$1M-20M' },
                        ]}
                    />
                    <CustomFormField
                        control={control}
                        fieldType={FormFieldType.SELECT}
                        name="buisness_location"
                        placeholder="Select Country"
                        className=' focus:ring-0   '
                        selectOptions={[
                            { label: 'North America', value: 'north_america' },
                            { label: 'Europe', value: 'europe' },
                            { label: 'Asia-Specific', value: 'asia_specific' },
                        ]}
                    />
                    <Button type="submit" variant={"default"} className='w-full border-none bg-primary text-white text-[15px] rounded-[5px] py-6'>Subscribe Now</Button>
                </form>
            </Form>
        </div>
    )
}