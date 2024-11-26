"use client";
import React, { useEffect, useState } from "react";
import PageWrapper from "../../_components/PageWrapper";
import SectionLayout from "@/components/common/CommonSectionLayout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Droppable, Draggable, DragDropContext } from "@hello-pangea/dnd";
import { motion } from "framer-motion";
import { Grip, Edit, Plus } from "lucide-react";
import ActionBarLayout from "@/components/common/CommonActionBarLayout";
import { useGetAllHomePageCarousalQuery } from "@/store/api/store/storefront";
import { HomePageCarouselData } from "@/store/api/store/storefront/types";
import Link from "next/link";

const HomePageCarousalPage = () => {
    const { data } = useGetAllHomePageCarousalQuery();

    const [selectedSlideIndex, setSelectedSlideIndex] = useState(0);

    const slides: HomePageCarouselData[] = data?.Data || [];

    const onDragEnd = (result: any) => {
        if (!result.destination) return;

        const reorderedSlides = [...slides];
        const [removed] = reorderedSlides.splice(result.source.index, 1);
        reorderedSlides.splice(result.destination.index, 0, removed);

    };

    const handleSelectSlide = (index: number) => {
        setSelectedSlideIndex(index);
    };


    return (
        <PageWrapper title="Home Page Carousel" className="max-w-6xl ">
            <SectionLayout title="Home Page Carousel" className="px-12 grid grid-cols-3 items-center space-x-2 gap-2">
                <div className="absolute top-0 right-2 ">
                    <Button asChild>
                        <Link href={`/dashboard/storefront/home-page-carousal/create`}>
                            <Plus className="pe-2" />  Add Slide
                        </Link>
                    </Button>
                </div>
                <div className="w-full col-span-2 h-full border relative flex items-center justify-center">
                    <HomePageCarousalContent
                        slides={slides}
                        selectedSlideIndex={selectedSlideIndex}
                    />
                </div>
                <div className="space-y-3 w-full col-span-1">
                    <DragDropContext onDragEnd={() => { }}>
                        <Droppable droppableId="slides" direction="vertical" >
                            {(provided) => (
                                <div
                                    className="grid w-full grid-cols-1 gap-3"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    {slides.map((slide, index) => (
                                        <Draggable
                                            key={slide.StoreCarouselID.toString()}
                                            draggableId={slide.StoreCarouselID.toString()}
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
                                                    <div className="flex gap-3 items-center px-5">
                                                        <Grip className="w-6 h-6 text-gray-500" />
                                                        <div className="w-full h-24 overflow-hidden border-l">
                                                            {slide.ImageURL ? (
                                                                <Image
                                                                    src={slide.ImageURL}
                                                                    alt={`Slide ${index + 1}`}
                                                                    height={300}
                                                                    width={900}
                                                                    className="object-cover"
                                                                />
                                                            ) : (
                                                                <div className="w-full flex items-center justify-center h-full">
                                                                    No Slide
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <motion.div
                                                        whileTap={{ scale: 0.7 }}
                                                        initial={{ scale: 1 }}
                                                        className="absolute top-3 right-3 bg-transparent"
                                                    >
                                                        <Link href={`/dashboard/storefront/home-page-carousal/create?id=${slide.StoreCarouselID}`}>
                                                            <Edit size={18} strokeWidth={2} color="green" />
                                                        </Link>
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
                </div>
            </SectionLayout>
        </PageWrapper>
    );
};

export default HomePageCarousalPage;

interface HomePageCarousalContentProps {
    selectedSlideIndex: number;
    slides: HomePageCarouselData[];
}

const HomePageCarousalContent = ({
    slides,
    selectedSlideIndex,
}: HomePageCarousalContentProps) => {
    return (
        <div className="flex w-full items-center justify-center">
            <div className="aspect-video min-w-[30rem]  border relative rounded-md text-white overflow-hidden flex flex-col gap-y-6 items-start justify-center px-12">
                {slides[selectedSlideIndex]?.ImageURL ? (
                    <Image
                        src={slides[selectedSlideIndex].ImageURL}
                        alt="Slide"
                        fill
                        style={{ objectFit: "cover" }}
                        className="z-20  bg-gray-300"
                    />
                ) : (
                    <div className="w-full absolute h-full inset-0 flex items-center justify-center bg-gray-300">
                        No Image
                    </div>
                )}
                <h1 className="text-4xl font-bold z-40">
                    {slides[selectedSlideIndex]?.CarouselHeading || "Heading"}
                </h1>
                <h3 className="text-xl font-thin z-40">
                    {slides[selectedSlideIndex]?.CarouselText || "Subtitle"}
                </h3>
                <Button type="button" className="z-40">{slides[selectedSlideIndex]?.BtnText || "Button"}</Button>
            </div>
            <ActionBarLayout>
                <Button variant="outline" type="button" className="px-5">
                    Cancel
                </Button>
                <Button className="px-4">Update Carousel</Button>
            </ActionBarLayout>
        </div>
    );
};
