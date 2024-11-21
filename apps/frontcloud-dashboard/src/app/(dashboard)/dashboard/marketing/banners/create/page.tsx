"use client";
import React, { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/common/CustomFormField";
import { FormFieldType } from "@/enum/formTypes";
import { Button } from "@/components/ui/button";
import ActionBarLayout from "@/components/common/CommonActionBarLayout";
import { useRouter } from "next/navigation";
import bannerSchema, { bannerFormValues } from "@/zod/marketing/banner.schema";
import SectionLayout from "@/components/common/CommonSectionLayout";
import PageWrapper from "../../../_components/PageWrapper";
import { FileUpload } from "@/components/ui/file-upload";
import { CustomParagraph } from "@/components/custom/CustomParagraph";
import { FileType } from "@/enum/fileTypes";
import { useCreateMarketingBannerMutation } from "@/store/api/marketing";
import { toast } from "sonner";
import { useGetAllCategoriesQuery } from "@/store/api/products/category";

const CreateBanners = () => {
    const router = useRouter();

    const form = useForm<bannerFormValues>({
        resolver: zodResolver(bannerSchema),
        defaultValues: {
            location: {
                label: "homepage",
            },
            dateRange: "false",
            storeID: "1",
            placement: "top",
            visible: true,
        },
        mode: "all",
        reValidateMode: "onChange",
        criteriaMode: "all",
    });

    const {
        control,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = form;

    const { data: AllCategories } = useGetAllCategoriesQuery();

    const parentCategoryOptions = useMemo(() => {
        if (AllCategories && AllCategories.data.length > 0) {
            return AllCategories.data.map((category) => ({
                label: category.CategoryName,
                value: category?.CategoryID?.toString() ?? " ",
            }));
        }
        return [];
    }, [AllCategories]);

    const [CreateBanner, { isLoading }] = useCreateMarketingBannerMutation();

    // console.log("errror", errors)

    const onSubmit = async (data: bannerFormValues) => {
        // console.log("Form data:", data);

        // Create a new FormData object
        const formData = new FormData();
        const { image, location, ...rest } = data;

        Object.keys(rest).forEach((key) => {
            // console.log("key", key)
            if (data[key as keyof bannerFormValues] !== undefined) {
                formData.append(key, data[key as keyof bannerFormValues]);
            }
        });

        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }
        if (data.location && data.location.label) {
            formData.append("location", data.location.label);
        }
        if (
            data.location &&
            data.location.label === "specificcategory" &&
            data.location.value
        ) {
            formData.append("categoryID", data.location.value);
        }

        // Sending the FormData to the backend
        const promise = CreateBanner(formData).unwrap();

        toast.promise(promise, {
            loading: "Creating banner...",
            success: () => "Banner created successfully",
            error: (error: any) =>
                error?.data ? error.data.message : "Failed to update user.",
        });

        try {
            await promise;
            reset();
            router.replace("/dashboard/marketing/banners");
        } catch (e) {
            console.log("error", e);
            toast.error("Error creating banner");
        }
    };

    useEffect(() => {
        if (watch("dateRange") === "false") {
            setValue("startDate", undefined);
            setValue("endDate", undefined);
        }
    }, [watch("dateRange")]);

    useEffect(() => {
        if (
            watch("location.label") !== "specificcategory" ||
            watch("location.label") !== "specificbrand"
        ) {
            setValue("location.value", undefined);
        }
    }, [watch("location.label")]);

    return (
        <PageWrapper
            title="Create a banner"
            subTitle="Banners are a great way to advertise sales, display coupon codes and promotions, relay important information, and to add design elements such as images and video"
        >
            <SectionLayout title="Banner details" className="max-w-5xl mx-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <CustomFormField
                            fieldType={FormFieldType.INPUT}
                            name={"marketingBannerName"}
                            control={control}
                            label="Name"
                            placeholder=" Name"
                            className="ring-1 ring-gray-300"
                        />

                        <div className="h-[25rem]">
                            <CustomFormField
                                fieldType={FormFieldType.RICHTEXTEDITOR}
                                name={"content"}
                                control={control}
                                label="Content"
                            />
                        </div>

                        {/* Images & Videos */}
                        <div className="flex items-center justify-between">
                            <CustomParagraph
                                variant="medium"
                                className=" text-black text-left"
                            >
                                Images & Videos
                            </CustomParagraph>
                        </div>
                        <div className="w-full flex flex-col gap-y-1 border">
                            <FileUpload
                                onChange={(files) => {
                                    setValue("image", files);
                                }}
                                fileType={FileType.ANY_IMAGE}
                                multiple={false}
                            />
                        </div>
                        <CustomFormField
                            fieldType={FormFieldType.RADIOGROUP}
                            name={"location.label"}
                            control={control}
                            label="Location"
                            selectOptions={[
                                { label: "Homepage", value: "homepage" },
                                { label: "For a specific category", value: "specificcategory" },
                                { label: "For a specific brand", value: "specificbrand" },
                                { label: "Search results page", value: "resultpage" },
                            ]}
                        />
                        {
                            // parentCategoryOptions && parentCategoryOptions.length > 0 &&
                            <div className="pb-7">
                                {watch("location.label") === "specificcategory" && (
                                    <CustomFormField
                                        fieldType={FormFieldType.SELECT}
                                        name="location.value"
                                        control={control}
                                        placeholder="Select category"
                                        label="Select category"
                                        defaultValue="category1"
                                        selectOptions={[
                                            { label: "Category 1", value: "1" },
                                            { label: "Category 2", value: "2" },
                                            { label: "Category 3", value: "3" },
                                        ]}
                                    />
                                )}
                            </div>
                        }
                        {watch("location.label") === "specificbrand" && (
                            <CustomFormField
                                fieldType={FormFieldType.SELECT}
                                name="location.value"
                                control={control}
                                label="Select brand"
                                defaultValue="brand1"
                                placeholder="Select brand"
                                selectOptions={[
                                    { label: "Brand 1", value: "brand1" },
                                    { label: "Brand 2", value: "brand2" },
                                    { label: "Brand 3", value: "brand3" },
                                ]}
                            />
                        )}
                        <CustomFormField
                            fieldType={FormFieldType.RADIOGROUP}
                            name={"dateRange"}
                            control={control}
                            label="Date range"
                            selectOptions={[
                                { label: "Always show", value: "false" },
                                { label: "Show between dates", value: "true" },
                            ]}
                        />
                        {watch("dateRange") === "true" && (
                            <div className="flex items-center gap-x-6">
                                <CustomFormField
                                    fieldType={FormFieldType.DATE_PICKER}
                                    name={"startDate"}
                                    control={control}
                                    label="Start date"
                                />
                                <CustomFormField
                                    fieldType={FormFieldType.DATE_PICKER}
                                    name={"endDate"}
                                    control={control}
                                    label="End date"
                                />
                            </div>
                        )}
                        <CustomFormField
                            fieldType={FormFieldType.CHECKBOX}
                            name={"visible"}
                            control={control}
                            checked={watch("visible")}
                            label="Visible"
                            placeholder="Yes, this banner should be visible on my web site"
                        />
                        <CustomFormField
                            fieldType={FormFieldType.RADIOGROUP}
                            name={"placement"}
                            control={control}
                            label="Placement"
                            selectOptions={[
                                { label: "Top", value: "top" },
                                { label: "Bottom", value: "bottom" },
                            ]}
                        />
                        <ActionBarLayout>
                            <Button
                                variant={"outline"}
                                type="button"
                                className="px-5"
                                onClick={() => router.back()}
                            >
                                Calcle
                            </Button>
                            <Button disabled={isLoading} className="px-4">
                                Save Banner
                            </Button>
                        </ActionBarLayout>
                    </form>
                </Form>
            </SectionLayout>
        </PageWrapper>
    );
};

export default CreateBanners;
