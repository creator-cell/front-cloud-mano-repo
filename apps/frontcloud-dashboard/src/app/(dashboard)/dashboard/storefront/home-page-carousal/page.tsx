"use client";
import React, { useState } from "react";
import PageWrapper from "../../_components/PageWrapper";
import SectionLayout from "@/components/common/CommonSectionLayout";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { FormFieldType } from "@/enum/formTypes";
import CustomFormField from "@/components/common/CustomFormField";
import homePageCarousalSchema, {
    homePageCarousalFormValues,
} from "@/zod/storefront/home-page-carousal.schema";
import { Button } from "@/components/ui/button";
import Image, { StaticImageData } from "next/image";
import { Droppable, Draggable, DragDropContext } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import { X } from "lucide-react";

import hero from "@/assets/extra/hero-01.jpg";
import hero1 from "@/assets/extra/signup_left_img.webp";
import { FileUpload } from "@/components/ui/file-upload";
import { FileType } from "@/enum/fileTypes";
import ActionBarLayout from "@/components/common/CommonActionBarLayout";




interface Slide {
    id: string;
    title: string;
    subtitle: string;
    buttonText: string;
    imageUrl: string | StaticImageData | File
}


const HomePageCarousalPage = () => {


    // State for storing carousel slides
    const [slides, setSlides] = useState<Slide[]>([
        { id: "1", title: "The Task Lamp", subtitle: "Our signature fixture that bends to your will", buttonText: "Shop Now", imageUrl: hero },
        { id: "2", title: "Helth", subtitle: "Our signature fixture", buttonText: "", imageUrl: hero1 },
        { id: "3", title: "", subtitle: "", buttonText: "", imageUrl: "" },
        { id: "4", title: "", subtitle: "", buttonText: "", imageUrl: "" },
        { id: "5", title: "", subtitle: "", buttonText: "", imageUrl: "" },
    ]);

    const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const reorderedSlides = [...slides];
        const [removed] = reorderedSlides.splice(result.source.index, 1);
        reorderedSlides.splice(result.destination.index, 0, removed);

        setSlides(reorderedSlides);
    };

    // When a slide is clicked, load the content into the form fields
    const handleSelectSlide = (index: number) => {
        setSelectedSlideIndex(index);
    };

    const handleDeleteImage = (index: number) => {
        const newSlides = [...slides];
        newSlides[index].imageUrl = "";
        setSlides(newSlides);
    };

    return (
        <PageWrapper title="Home Page Carousel" className="max-w-6xl">
            <SectionLayout title="Home Page Carousel" className="px-12 space-y-6">

                <HomePageCarousalContent
                    slides={slides}
                    setSlides={setSlides}
                    selectedSlideIndex={selectedSlideIndex}
                />



                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="slides" direction="horizontal">
                        {(provided) => (
                            <div
                                className="grid h-24 grid-cols-5 gap-x-3"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {slides.map((slide, index) => (
                                    <Draggable
                                        key={slide.id}
                                        draggableId={slide.id}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                className="h-24 object-cover border border-gray-500 rounded-md relative cursor-pointer"
                                                onClick={() => handleSelectSlide(index)}
                                            >
                                                {slide.imageUrl ? (
                                                    <Image
                                                        src={slide.imageUrl as string}
                                                        // src={typeof slide.imageUrl === "string"
                                                        //     ? slide.imageUrl
                                                        //     : URL.createObjectURL(slide.imageUrl as File)}
                                                        alt={`Slide ${index + 1}`}
                                                        height={300}
                                                        width={900}
                                                        className="h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full bg-gray-300 flex items-center justify-center">
                                                        Upload Image
                                                    </div>
                                                )}
                                                <motion.div
                                                    whileTap={{ scale: 0.7 }}
                                                    initial={{ scale: 1 }}
                                                    className="absolute top-0 right-0 border rounded-full"
                                                    onClick={() => handleDeleteImage(index)}
                                                >
                                                    <X
                                                        size={18}
                                                        strokeWidth={2}
                                                        color="red"
                                                        className=""
                                                    />
                                                </motion.div>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>

                </DragDropContext>
            </SectionLayout >
        </PageWrapper >
    );
};

export default HomePageCarousalPage;



interface HomePageCarousalContent {
    selectedSlideIndex: number;
    slides: Slide[]
    setSlides: (slides: Slide[]) => void;
}

const HomePageCarousalContent = ({
    slides,
    selectedSlideIndex,
    setSlides
}: HomePageCarousalContent) => {

    const form = useForm<any>({
        // resolver: zodResolver(homePageCarousalSchema),
        mode: "all",
        defaultValues: {
            autoPlayTime: 5,
            heading: slides[selectedSlideIndex].title || "",
            text: slides[selectedSlideIndex].subtitle || "",
            buttonText: slides[selectedSlideIndex].buttonText || "",
            // link: slides[selectedSlideIndex].link || "",

        },
    });

    const {
        register,
        control,
        watch,
        formState: { errors },
        setValue
    } = form;



    const handleSubmitSlideData = (data: homePageCarousalFormValues) => {
        // const updatedSlides = [...slides];
        // updatedSlides[selectedSlideIndex] = {
        //     ...updatedSlides[selectedSlideIndex],
        //     ...data,
        // };
        // setSlides(updatedSlides);
        console.log("data", data)

        const updatedSlides = [...slides];
        updatedSlides[selectedSlideIndex].title = data.heading ?? "Default Title";

        updatedSlides[selectedSlideIndex].subtitle = data.text ?? "Default Subtitle";

        updatedSlides[selectedSlideIndex].buttonText = data.buttonText ?? "Shop Now";

        setSlides(updatedSlides);
    };

    console.log("iamges", slides[selectedSlideIndex].imageUrl)

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmitSlideData)}
                className="space-y-6"
            >


                <div className="grid grid-cols-4 gap-x-3" >
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"heading"}
                        control={control}
                        placeholder="Heading"
                        label="Heading"
                        className="ring-1 ring-gray-300 rounded-md p-2"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"text"}
                        control={control}
                        label="Text"
                        className="ring-1 ring-gray-300 rounded-md p-2"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"buttonText"}
                        control={control}
                        placeholder="Shop Now"
                        label="Button Text"
                        className="ring-1 ring-gray-300 rounded-md p-2"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"link"}
                        control={control}
                        label="Link"
                        className="ring-1 ring-gray-300 rounded-md p-2"
                    />
                </div >
                {/* Image Preview and Upload */}
                <div className="flex ">
                    <div className="w-[70%] max-w-3xl aspect-video border relative rounded-md text-white overflow-hidden flex flex-col gap-y-6 items-start justify-center px-12">
                        {
                            slides[selectedSlideIndex].imageUrl ?
                                <>
                                    <Image
                                        // src={typeof slides[selectedSlideIndex].imageUrl === "string" || slides[selectedSlideIndex].imageUrl instanceof StaticImageData
                                        //     ? slides[selectedSlideIndex].imageUrl
                                        //     : URL.createObjectURL(slides[selectedSlideIndex].imageUrl as File)}
                                        src={slides[selectedSlideIndex].imageUrl as string}
                                        alt="hero" layout="fill" objectFit="cover" className="z-20" />
                                    <h1 className="text-4xl font-bold z-40">{slides[selectedSlideIndex].title || "Heading"}</h1>
                                    <h3 className="text-xl font-thin z-40">{slides[selectedSlideIndex].subtitle || "Subtitle"}</h3>
                                    <Button className="z-40">{slides[selectedSlideIndex].buttonText || "Button"}</Button>
                                </>
                                : <div className=' size-full '>
                                    <FileUpload
                                        // onChange={(files) => {
                                        //      setValue("logo_image", files);

                                        // }}
                                        onChange={(files) => {
                                            const updatedSlides = [...slides];
                                            updatedSlides[selectedSlideIndex].imageUrl = files[0];
                                            // Set default values if they don't already exist
                                            if (!updatedSlides[selectedSlideIndex].title) {
                                                updatedSlides[selectedSlideIndex].title = "Default Title";
                                            }
                                            if (!updatedSlides[selectedSlideIndex].subtitle) {
                                                updatedSlides[selectedSlideIndex].subtitle = "Default Subtitle";
                                            }
                                            if (!updatedSlides[selectedSlideIndex].buttonText) {
                                                updatedSlides[selectedSlideIndex].buttonText = "Shop Now";
                                            }
                                            setSlides(updatedSlides);
                                        }}
                                        fileType={FileType.ANY_IMAGE}
                                        multiple={false}
                                    />
                                </div>
                        }

                    </div >
                    <SectionLayout title="Settings" className="flex-1 space-y-6 px-0">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            control={control}
                            name={"autoPlayTime"}
                            label="Auto Play Time"
                            className="ring-1 ring-gray-300 rounded-md p-2"
                        />
                    </SectionLayout>
                </div>

                <ActionBarLayout>
                    <Button variant={"outline"} type='button' className='px-5'  >Calcle</Button>
                    <Button className='px-4'>Save Brand</Button>
                </ActionBarLayout>
            </form >
        </Form >
    )


}