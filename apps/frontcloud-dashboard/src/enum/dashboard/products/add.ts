export interface Tab {
    value: string;
    label: string;
}

export const tabs: Tab[] = [
    {
        value: "all_products",
        label: "All Products"
    },
    {
        value: "featured",
        label: "Featured"
    },
    {
        value: "free_shiping",
        label: "Free Shiping"
    },
    {
        value: "last_import",
        label: "Last Import"
    },
    {
        value: "out_of_stock",
        label: "Out of Stock"
    },
    {
        value: "not_visible",
        label: "Not Visible"
    },
    {
        value: "visible",
        label: "Visible"
    },
]

interface Section {
    label: string;
    idName: string;
}


export interface ProductFormSection {
    title: string;
    subtitle: string;
    sections: Section[];
}


export const AdProductFormSections: ProductFormSection[] = [
    {
        title: "Product Information",
        subtitle: "Basic product information",
        sections: [
            {
                label: "Basic information",
                idName: "basic_information",
            },
            {
                label: "Description",
                idName: "description",
            },
            {
                label: "Images & videos",
                idName: "images_videos",
            },
            {
                label: "Product identifiers",
                idName: "product_identifiers",
            },
            {
                label: "Pricing",
                idName: "pricing",
            },
            {
                label: "Inventory",
                idName: "inventory",
            }
        ]
    },
    {
        title: "Product Options",
        subtitle: "Create product variations and customizations.",
        sections: [
            {
                label: "Variations",
                idName: "variations",
            },
            // {
            //     label: "Customizations",
            //     idName: "customizations",
            // }
        ]
    },
    {
        title: "Storefront",
        subtitle: "Setup what customers will see on the storefront.",
        sections: [
            {
                label: "Storefront details",
                idName: "storefront_details",
            },
            // {
            //     label: "Custom fields",
            //     idName: "custom_fields",
            // },
            {
                label: "Related products",
                idName: "related_products",
            }
        ]
    },
    {
        title: "Fulfillment",
        subtitle: "Setup shipping and inventory details for this product.",
        sections: [
            {
                label: "Dimensions & weight",
                idName: "dimensions_weight",
            },
            {
                label: "Shipping details",
                idName: "shipping_details",
            },
            {
                label: "Purchasability",
                idName: "purchasability",
            },
            {
                label: "Gift wrapping",
                idName: "gift_wrapping",
            },
            // {
            //     label: "Customs information",
            //     idName: "customs_information"
            // }
        ]
    },

    {
        title: "SEO & Sharing",
        subtitle: "Boost traffic to your online business.",
        sections: [
            {
                label: "SEO",
                idName: "seo"
            },
            // {
            //     label: "Open graph sharing",
            //     idName: "open_graph_sharing"
            // }
        ]
    }
]


export enum ProductFormSectionIds {
    BASIC_INFORMATION = "basic_information",
    DESCRIPTION = "description",
    IMAGES_AND_VIDEOS = "images_videos",
    PRODUCT_IDENTIFIERS = "product_identifiers",
    PRICING = "pricing",
    INVENTORY = "inventory",
    VARIATIONS = "variations",
    CUSTOMIZATIONS = "customizations",
    STOREFRONT_DETAILS = "storefront_details",
    CUSTOM_FIELDS = "custom_fields",
    RELATED_PRODUCTS = "related_products",
    DIMENSIONS_AND_WEIGHT = "dimensions_weight",
    SHIPPING_DETAILS = "shipping_details",
    PURCHASABILITY = "purchasability",
    GIFT_WRAPPING = "gift_wrapping",
    CUSTOMS_INFORMATION = "customs_information",
    SEO = "seo",
    OPEN_GRAPH_SHARING = "open_graph_sharing"
}

