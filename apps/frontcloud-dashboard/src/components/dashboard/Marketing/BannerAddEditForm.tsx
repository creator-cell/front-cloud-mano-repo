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
import { FileUpload } from "@/components/ui/file-upload";
import { CustomParagraph } from "@/components/custom/CustomParagraph";
import { FileType } from "@/enum/fileTypes";
import { useCreateMarketingBannerMutation } from "@/store/api/store/marketing";
import { toast } from "sonner";
import { useGetAllCategoriesQuery } from "@/store/api/products/category";
import { MarketingBanner } from "@/store/api/store/marketing/types/banner-types";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface BannerAddEditFormProps {
    data?: MarketingBanner;
    id?: string;
}

const BannerAddEditForm: React.FC<BannerAddEditFormProps> = ({
    data,
    id,
}) => {
    const router = useRouter();

    const form = useForm<bannerFormValues>({
        resolver: zodResolver(bannerSchema),
        defaultValues: data ?
            {
                MarketingBannerName: data.MarketingBannerName,
                Content: data.Content,
                Image: data.ImageURL,
                Location: {
                    label: data.Location,
                    value: data.Location === "specificcategory" ? data.CategoryID ? data?.Location === "specificcategory" ? data.CategoryID : " " : " " : " ",
                } as any,
                DateRange: data.DateRange === 1 ? "true" : "false",
                StartDate: data.StartDate as any,
                EndDate: data.EndDate as any,
                StoreID: data.StoreID as any,
                Placement: data.Placement,
                Visible: data.Visible === 1 ? true : false,
            }
            : {
                Location: {
                    label: "homepage",
                },
                DateRange: "false",
                StoreID: "1",
                Placement: "top",
                Visible: true,
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

    console.log("🚀 ~ CreateBanners ~ errors:", errors)
    const { data: AllCategories } = useGetAllCategoriesQuery();

    const parentCategoryOptions = useMemo(() => {
        if (AllCategories && AllCategories.Data.length > 0) {
            return AllCategories.Data.map((category) => ({
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
        const { Image, Location, ...rest } = data;

        Object.keys(rest).forEach((key) => {
            // console.log("key", key)
            if (data[key as keyof bannerFormValues] !== undefined) {
                formData.append(key, data[key as keyof bannerFormValues]);
            }
        });

        if (data.Image && data.Image[0]) {
            formData.append("Image", data.Image[0]);
        }
        if (data.Location && data.Location.label) {
            formData.append("Location", data.Location.label);
        }
        if (
            data.Location &&
            data.Location.label === "specificcategory" &&
            data.Location.value
        ) {
            formData.append("categoryID", data.Location.value);
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
        if (watch("DateRange") === "false") {
            setValue("StartDate", undefined);
            setValue("EndDate", undefined);
        }
    }, [watch("DateRange")]);

    useEffect(() => {
        if (
            watch("Location.label") !== "specificcategory" ||
            watch("Location.label") !== "specificbrand"
        ) {
            setValue("Location.value", undefined);
        }
    }, [watch("Location.label")]);

    return (
        <SectionLayout title="Banner details" className="max-w-5xl mx-auto">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <CustomFormField
                        fieldType={FormFieldType.INPUT}
                        name={"MarketingBannerName"}
                        control={control}
                        label="Name"
                        placeholder=" Name"
                        className="ring-1 ring-gray-300"
                    />

                    <div className="h-[25rem]">
                        <CustomFormField
                            fieldType={FormFieldType.RICHTEXTEDITOR}
                            name={"Content"}
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
                    <div className={cn("w-full  gap-y-1 border",
                        data?.ImageURL ? "grid grid-cols-2" : "flex flex-col"
                    )}>
                        <FileUpload
                            onChange={(files) => {
                                setValue("Image", files);
                            }}
                            fileType={FileType.ANY_IMAGE}
                            multiple={false}
                        />
                        {
                            data?.ImageURL &&
                            <div>
                                <Image
                                    src={data?.ImageURL ?? ""}
                                    alt="Banner Image"
                                    width={100}
                                    height={100}
                                    className="object-cover w-20 h-20"
                                />
                            </div>
                        }
                    </div>
                    <CustomFormField
                        fieldType={FormFieldType.RADIOGROUP}
                        name={"Location.label"}
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
                            {watch("Location.label") === "specificcategory" && (
                                <CustomFormField
                                    fieldType={FormFieldType.SELECT}
                                    name="Location.value"
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
                    {watch("Location.label") === "specificbrand" && (
                        <CustomFormField
                            fieldType={FormFieldType.SELECT}
                            name="Location.value"
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
                        name={"DateRange"}
                        control={control}
                        label="Date range"
                        className="w-fit"
                        selectOptions={[
                            { label: "Always show", value: "false" },
                            { label: "Show between dates", value: "true" },
                        ]}
                    />
                    {watch("DateRange") === "true" && (
                        <div className="flex items-center gap-x-6">
                            <CustomFormField
                                fieldType={FormFieldType.DATE_PICKER}
                                name={"StartDate"}
                                control={control}
                                label="Start date"
                            />
                            <CustomFormField
                                fieldType={FormFieldType.DATE_PICKER}
                                name={"EndDate"}
                                control={control}
                                label="End date"
                            />
                        </div>
                    )}
                    <CustomFormField
                        fieldType={FormFieldType.CHECKBOX}
                        name={"Visible"}
                        control={control}
                        checked={watch("Visible")}
                        label="Visible"
                        placeholder="Yes, this banner should be visible on my web site"
                    />
                    <CustomFormField
                        fieldType={FormFieldType.RADIOGROUP}
                        name={"Placement"}
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
                            {
                                data ? "Update" : "Create"
                            }
                        </Button>
                    </ActionBarLayout>
                </form>
            </Form>
        </SectionLayout>
    );
};

export default BannerAddEditForm;
