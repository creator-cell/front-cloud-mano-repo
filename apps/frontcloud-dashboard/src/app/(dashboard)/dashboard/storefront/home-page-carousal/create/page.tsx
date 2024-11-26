"use client";
import React, { useEffect } from "react";
import SectionLayout from "@/components/common/CommonSectionLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFieldType } from "@/enum/formTypes";
import CustomFormField from "@/components/common/CustomFormField";
import homePageCarousalSchema, {
    homePageCarousalFormValues,
} from "@/zod/storefront/home-page-carousal.schema";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import { FileUpload } from "@/components/ui/file-upload";
import { FileType } from "@/enum/fileTypes";
import ActionBarLayout from "@/components/common/CommonActionBarLayout";
import PageWrapper from "../../../_components/PageWrapper";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { HomePageCarouselData } from "@/store/api/store/storefront/types";
import { useCreateHomePageCarousalMutation, useGetHomePageCarousalByIdQuery, useUpdateHomePageCarousalMutation } from "@/store/api/store/storefront/carousel";


const AddCarousal = () => {

    const searchParams = useSearchParams()

    const id = searchParams.get('id')

    const { data } = useGetHomePageCarousalByIdQuery(id ?? "");
    console.log("🚀 ~ AddCarousal ~ data:", data)



    return (
        <PageWrapper title="Home Page Carousel" className="max-w-7xl">
            {
                id ? data?.Data && data?.Data?.length > 0 &&
                    <HomePageCarousalContent data={data?.Data?.[0] ?? []} SlideId={id} /> :
                    <HomePageCarousalContent />
            }
        </PageWrapper >
    );
};

export default AddCarousal;



interface HomePageCarousalContentProps {
    data?: HomePageCarouselData
    SlideId?: string
}

const HomePageCarousalContent = ({
    data,
    SlideId
}: HomePageCarousalContentProps) => {


    const form = useForm<homePageCarousalFormValues>({
        resolver: zodResolver(homePageCarousalSchema),
        mode: "all",
        reValidateMode: "onChange",
        criteriaMode: "all",
        defaultValues: data ? {
            PlayTime: data?.PlayTime,
            CarouselLink: data?.CarouselLink,
            CarouselHeading: data?.CarouselHeading,
            CarouselText: data?.CarouselText,
            BtnText: data?.BtnText,
            Image: data?.ImageURL ? [data?.ImageURL] : [],

        } : {
            PlayTime: 5,
            Image: [],
        },
    });

    const {
        register,
        control,
        watch,
        formState: { errors },
        setValue,
        reset
    } = form;

    console.log("🚀 ~ errors:", watch("Image"))
    const router = useRouter()

    const [CreateCarousal, { isLoading }] = useCreateHomePageCarousalMutation()
    const [UpdateCarousal, { isLoading: isUpdating }] = useUpdateHomePageCarousalMutation()

    const handleSubmitSlideData = async (data: homePageCarousalFormValues) => {
        console.log("🚀 ~ handleSubmitSlideData ~ data:", data);

        const formData = new FormData();

        // Helper function to convert a URL to a File
        const urlToFile = async (url: string, fileName: string): Promise<File> => {
            const response = await fetch(url);
            const blob = await response.blob();
            return new File([blob], fileName, { type: blob.type });
        };

        formData.append("StoreID", "1");

        for (const key of Object.keys(data)) {
            const value = data[key as keyof homePageCarousalFormValues];

            if (key === "image") {
                if (Array.isArray(value)) {
                    const image = value[0];

                    if (typeof image === "string") {
                        // Convert URL to File
                        const file = await urlToFile(image, "updated-image.jpg");
                        formData.append("Image", file);
                    } else if (image instanceof File) {
                        formData.append("Image", image);
                    }
                }
            } else if (typeof value === "string" || typeof value === "number") {
                formData.append(key, String(value));
            }
        }

        try {
            if (data && SlideId) {
                // console.log("🚀 ~ handleSubmitSlideData ~ data:", data);
                if (!SlideId) {
                    toast.error("Slide ID is missing");
                    return;
                }
                const promise = UpdateCarousal({ id: parseFloat(SlideId), data: formData }).unwrap();

                toast.promise(promise, {
                    loading: "Updating Carousel",
                    success: "Carousel Updated",
                    error: "Failed to Update Carousel",
                });
                await promise;
                reset();
                router.replace("/dashboard/storefront/home-page-carousal");
            } else {
                const promise = CreateCarousal(formData).unwrap();

                toast.promise(promise, {
                    loading: "Creating Carousel",
                    success: "Carousel Created",
                    error: "Failed to Create Carousel",
                });
                await promise;
                reset();
                router.replace("/dashboard/storefront/home-page-carousal");
            }
        } catch (e) {
            console.log("🚀 ~ handleSubmitSlideData ~ e:", e);
        }
    };

    console.log("🚀 ~ watch()?.length:", watch("Image")?.length)


    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmitSlideData)}
                className="space-y-6"
            >
                <SectionLayout className="grid grid-cols-2 gap-5 px-10 " >
                    <div className="space-y-5">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"CarouselHeading"}
                            control={control}
                            placeholder="Heading"
                            label="Heading"
                            className="ring-1 ring-gray-300 rounded-md p-2"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"CarouselText"}
                            control={control}
                            label="Text"
                            className="ring-1 ring-gray-300 rounded-md p-2"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"BtnText"}
                            control={control}
                            placeholder="Shop Now"
                            label="Button Text"
                            className="ring-1 ring-gray-300 rounded-md p-2"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"CarouselLink"}
                            control={control}
                            label="Link"
                            className="ring-1 ring-gray-300 rounded-md p-2"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={control}
                            name={"PlayTime"}
                            label="Auto Play Time"
                            className="ring-1 ring-gray-300 rounded-md p-2"
                        />
                    </div>
                    <div className="w-full flex flex-col gap-y-1 border justify-center relative">
                        {
                            <FileUpload
                                onChange={(files) => {
                                    setValue("Image", files);
                                }}
                                fileType={FileType.ANY_IMAGE}
                                multiple={false}
                            />
                        }
                        {
                            (watch("Image")?.length < 1 && errors?.Image) && <p className="text-red-500 absolute top-7 left-9">{errors?.Image?.message}</p>
                        }
                    </div>
                </SectionLayout >
                {/* Image Preview and Upload */}


                <SectionLayout title="Preview" className="flex mx-auto w-full ">
                    <div className="flex mx-auto w-full">
                        <div className="w-full aspect-video mt-8 border relative rounded-md text-white overflow-hidden flex flex-col gap-y-6 items-start justify-center px-12">
                            {(watch("Image")?.[0] || data?.ImageURL) ?
                                <>
                                    <Image
                                        src={watch("Image")?.[0]
                                            ? typeof watch("Image")[0] === "string"
                                                ? watch("Image")[0]
                                                : URL.createObjectURL(watch("Image")[0] as File)
                                            : data?.ImageURL
                                                ? data.ImageURL : ""
                                        }
                                        alt="hero"
                                        layout="fill"
                                        objectFit="cover"
                                        className="z-20 bg-gray-300"
                                    />
                                    <h1 className="text-4xl font-bold z-40">
                                        {watch("CarouselHeading") || "Default Heading"}
                                    </h1>
                                    <h3 className="text-xl font-thin z-40">
                                        {watch("CarouselText") || "Default Subtitle"}
                                    </h3>
                                    <Button className="z-40">
                                        {watch("BtnText") || "Shop Now"}
                                    </Button>
                                </> :
                                <div className="w-full h-96 flex items-center justify-center bg-gray-200">
                                    <p className="text-gray-500"> uploaded Image to show Preview</p>
                                </div>
                            }
                        </div>
                    </div>
                </SectionLayout>

                <ActionBarLayout>
                    <Button variant={"outline"} type='button' className='px-5'  >Calcle</Button>
                    <Button className='px-4' disabled={isLoading || isUpdating} >{data ? "Update" : "Create"}</Button>
                </ActionBarLayout>
            </form >
        </Form >
    )
}