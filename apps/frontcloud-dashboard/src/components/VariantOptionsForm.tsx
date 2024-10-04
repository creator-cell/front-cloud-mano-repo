import { useForm, useFieldArray, Control, FieldErrors } from "react-hook-form";
import { Button } from "./ui/button";
import { Plus, Trash2 } from "lucide-react";
import CustomFormField from "./common/CustomFormField";
import { FormFieldType } from "@/enum/formTypes";
import { addProductFormValues, } from "@/zod/addProduct.schema";
import React, { useEffect } from "react";
import { toast } from "sonner";

interface VariantOptionsFormProps {
    errors: FieldErrors<addProductFormValues>;
    control: Control<addProductFormValues>;
}


const VariantOptionsForm: React.FC<VariantOptionsFormProps> = ({
    control,
    errors
}) => {

    const { fields, append, remove } = useFieldArray({
        control,
        name: "variantOption",
    });

    return (
        <div className="w-full space-y-6">

            {fields.map((field, index) => (
                <div key={field.id} className="space-y-4 border p-4 shadow-md">
                    <div className="grid grid-cols-3 gap-x-4">
                        {/* Option Name */}
                        <CustomFormField
                            control={control}
                            fieldType={FormFieldType.SELECT}
                            name={`variantOption.${index}.optionName`}
                            placeholder="Select Variant Attribute"
                            className="focus:ring-0"
                            defaultValue={field.optionName}
                            selectOptions={[
                                { label: "Color", value: "color" },
                                { label: "Size", value: "size" },
                            ]}
                        />

                        {/* Option Type */}
                        <CustomFormField
                            control={control}
                            fieldType={FormFieldType.SELECT}
                            name={`variantOption.${index}.optionType`}
                            placeholder="Select Variant Type"
                            className="focus:ring-0"
                            defaultValue={field.optionType}
                            selectOptions={[
                                { label: "Switch", value: "switch" },
                                { label: "Radio", value: "radio" },
                                { label: "Dropdown", value: "dropdown" },
                            ]}
                        />


                        {/* Option Values */}
                        <div>
                            <VariantOptionForm
                                control={control}
                                errors={errors}
                                variantOptionsIndex={index}
                                key={index}
                            />
                        </div>
                    </div>

                    {/* Remove Button */}
                    <div className="flex items-end">
                        <Button
                            variant="destructive"
                            onClick={() => remove(index)}
                            className="mt-2"
                        >
                            <Trash2 className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            ))}

            <div className="flex gap-x-4 items-center justify-end mt-4">

                <Button
                    type="button"
                    onClick={() =>
                        append({
                            optionName: "color",
                            optionType: "switch",
                            optionValues: [""],
                        })
                    }

                >
                    <Plus className="w-5 h-5" />
                    Add Variant Attribute
                </Button>
            </div>
        </div>
    );
};

export default VariantOptionsForm;

const VariantOptionForm = ({
    variantOptionsIndex,
    control,
    errors
}: {
    variantOptionsIndex: number;
    control: Control<addProductFormValues>;
    errors: FieldErrors<addProductFormValues>;

}) => {
    // console.log("🚀 ~ errors:---->>>>>>---", errors)
    const { fields, append, remove } = useFieldArray({
        control,
        name: `variantOption.${variantOptionsIndex}.optionValues` as any,
    });

    useEffect(() => {
        errors?.variantOption?.[variantOptionsIndex]?.optionValues
        toast.error(errors?.variantOption?.[variantOptionsIndex]?.optionValues?.message)
    }, [errors?.variantOption?.[variantOptionsIndex]?.optionValues?.message])
    // console.log("🚀 ~ errors:---->>>>>>---", errors?.variantOption?.[variantOptionsIndex]?.optionValues?.message)

    return (
        <div className="space-y-4 " >
            {fields.map((field, index) => {
                return (
                    <div key={field.id} className="flex flex-col space-y-3 relative">
                        <div className="flex gap-x-4 pb-2">
                            {/* Option Value Input */}
                            <CustomFormField
                                fieldType={FormFieldType.INPUT}
                                name={`variantOption.${variantOptionsIndex}.optionValues.${index}`}
                                control={control}
                                placeholder="Option Value"
                                className="ring-1 ring-gray-300 "
                            />
                            {/* Remove Button */}
                            <Button
                                variant="destructive"
                                type="button"
                                onClick={() => remove(index)}
                                className="w-fit mt-2"
                            >
                                <Trash2 className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>
                )
            })}

            {/* Add Option Value Button */}
            <Button type="button"
                onClick={() => append("")}
                className="mt-2">
                <Plus className="w-5 h-5" />
                Add Option Value
            </Button>
        </div>
    );
};


