"use client";
import React from "react";
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
import { useCreateHomePageCarousalMutation } from "@/store/api/storefront";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


const AddCarousal = () => {

    return (
        <PageWrapper title="Home Page Carousel" className="max-w-7xl">
            <HomePageCarousalContent />
        </PageWrapper >
    );
};

export default AddCarousal;



interface HomePageCarousalContent {
}

const HomePageCarousalContent = ({
}: HomePageCarousalContent) => {

    const form = useForm<homePageCarousalFormValues>({
        resolver: zodResolver(homePageCarousalSchema),
        mode: "all",
        reValidateMode: "onChange",
        criteriaMode: "all",
        defaultValues: {
            PlayTime: 5,
            Image: []
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

    console.log("🚀 ~ errors:", errors)
    const router = useRouter()

    const [CreateCarousal, { isLoading }] = useCreateHomePageCarousalMutation()

    const handleSubmitSlideData = async (data: homePageCarousalFormValues) => {
        console.log("🚀 ~ handleSubmitSlideData ~ data:", data)

        const formData = new FormData();

        Object.keys(data).forEach((key) => {
            const value = data[key as keyof homePageCarousalFormValues];

            // Exclude the 'image' field
            if (key === "image" && Array.isArray(value) && value[0] instanceof File) {
                formData.append("Image", value[0]);
            } else if (key !== "image" && (typeof value === "string" || typeof value === "number")) {
                formData.append(key, String(value));
            }
        });
        const promise = CreateCarousal(formData).unwrap();

        toast.promise(promise, {
            loading: "Creating Carousel",
            success: "Carousel Created",
            error: "Failed to Create Carousel",
        });
        try {
            await promise;
            reset();
            router.replace("/dashboard/storefront/home-page-carousal")
        } catch (e) {
            console.log("🚀 ~ handleSubmitSlideData ~ e:", e)
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
                        <FileUpload
                            onChange={(files) => {
                                setValue("Image", files);
                            }}
                            fileType={FileType.ANY_IMAGE}
                            multiple={false}
                        />
                        {
                            (watch("Image")?.length < 1 && errors?.Image) && <p className="text-red-500 absolute top-7 left-9">{errors?.Image?.message}</p>
                        }
                    </div>
                </SectionLayout >
                {/* Image Preview and Upload */}


                <SectionLayout title="Preview" className="flex mx-auto w-full ">
                    <div className="flex mx-auto w-full">
                        <div className="w-full aspect-video mt-8 border relative rounded-md text-white overflow-hidden flex flex-col gap-y-6 items-start justify-center px-12">
                            {watch("Image")?.[0] ?
                                <>
                                    <Image
                                        src={
                                            typeof watch("Image")[0] === "string"
                                                ? watch("Image")[0]
                                                : URL.createObjectURL(watch("Image")[0] as File)
                                        }
                                        alt="hero"
                                        layout="fill"
                                        objectFit="cover"
                                        className="z-20"
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
                    <Button className='px-4' disabled={isLoading} >Create</Button>
                </ActionBarLayout>
            </form >
        </Form >
    )


}