
interface Link {
    label: string;
    page: string;
    subLinks: SubLink[]
}

interface SubLink {
    label: string;
    page: string;
    subpage?: [
        {
            label: string;
            page: string;
        }
    ]
}

interface SidebarLink {
    // [key: string]: Link[]
    category: string;
    links: Link[];
}

export const sidebarLinks: SidebarLink[] = [
    {
        category: "BuisnessManagMentLinks",
        links: [{
            label: "Orders",
            page: "/dashboard/orders",
            subLinks: [
                {
                    label: "View",
                    page: "/dashboard/orders"
                },
                {
                    label: "Add",
                    page: "/dashboard/orders/add-orders"
                },
                {
                    label: "Search",
                    page: "search"
                },
                {
                    label: "Export",
                    page: "export"
                },
                {
                    label: "Draft Orders",
                    page: "draft_orders"
                },
                {
                    label: "Shiments",
                    page: "shipments"
                },
                {
                    label: "Tracking Number",
                    page: "tracking_numer"
                },
                {
                    label: "Gift Certificate",
                    page: "gift_certificate"
                }
            ]
        },
        {
            label: "Products",
            page: "/dashboard/products",
            subLinks: [
                {
                    label: "View",
                    page: "/dashboard/products"
                },
                {
                    label: "Add",
                    page: "/dashboard/products/add-products"
                },
                {
                    label: "Advance Search",
                    page: "/dashboard/products/advance-search-products"
                },
                {
                    label: "Import",
                    page: "/dashboard/products/import-products"

                },
                {
                    label: "Export",
                    page: "/dashboard/products/export-products"
                },
                {
                    label: "product Categories",
                    page: "/dashboard/products/product-categories",
                    subpage: [
                        {
                            label: "Add Categories",
                            page: "/dashboard/products/product-categories/add-categories"
                        }
                    ]
                },
                {
                    label: "product Sub Categories",
                    page: "/dashboard/products/product-subCategories",
                    subpage: [
                        {
                            label: "Add Categories",
                            page: "/dashboard/products/product-subCategories/add-subCategories"
                        }
                    ]
                },
                {
                    label: "Product Options",
                    page: "product_options"
                },
                {
                    label: "Product Filtering",
                    page: "product_filtering"
                },
                {
                    label: "Product Reviews",
                    page: "/dashboard/products/product-reviews"
                },
                {
                    label: "price Lists",
                    page: "price_lists"
                },
                {
                    label: "Brands ",
                    page: "/dashboard/products/brands",
                    subpage: [
                        {
                            label: "Add Brands",
                            page: "/dashboard/products/brands/edit"
                        }
                    ]
                },
                {
                    label: "Import Product SKUs",
                    page: "/dashboard/products/import-skus"
                },
                {
                    label: "Export Product SKUs",
                    page: "/dashboard/products/export-skus"
                }
            ]
        },
        {
            label: "Customers",
            page: "/dashboard/customers",
            subLinks: [
                {
                    label: "View",
                    page: "/dashboard/customers/view-customers"
                },
                {
                    label: "Add",
                    page: "/dashboard/customers/add-customers"
                },
                {
                    label: "Search",
                    page: "/dashboard/customers/search-customers"
                },
                {
                    label: "Import",
                    page: "/dashboard/customers/import-customers"
                },
                {
                    label: "Export",
                    page: "/dashboard/customers/export-customers"
                },
                {
                    label: "Customer Groups",
                    page: "/dashboard/customers/customer-groups"
                },
            ]
        }
        ],
    },

    {
        category: "StoreManagMentLinks",
        links: [
            {
                label: "Storefront",
                page: "/dashboard/storefront",
                subLinks: [
                    {
                        label: "Logo",
                        page: "/dashboard/storefront/logo"
                    },
                    {
                        label: "Home page carousal",
                        page: "/dashboard/storefront/home-page-carousal"
                    },
                    {
                        label: "social links",
                        page: "/dashboard/storefront/social-links"
                    },
                    {
                        label: "Blog",
                        page: "/dashboard/storefront/blog"
                    },
                    {
                        label: "gift certificate Template ",
                        page: "/dashboard/storefront/gift-certificate-template"
                    }
                ]
            },
            {
                label: "Marketing",
                page: "/dashboard/marketing",
                subLinks: [
                    {
                        label: "banners",
                        page: "/dashboard/marketing/banners",
                        subpage: [
                            {
                                label: "Add Banners",
                                page: "/dashboard/marketing/banners/create"
                            }
                        ]
                    },
                    {
                        label: "Promotions",
                        page: "/dashboard/marketing/promotions"
                    },
                    {
                        label: "Email Marketing Tempaltes",
                        page: "/dashboard/marketing/email-marketing-templates",
                        subpage: [
                            {
                                label: "Add Email Marketing Tempaltes",
                                page: "/dashboard/marketing/email-marketing-templates/edit"
                            }
                        ]
                    },
                    {
                        label: "Coupen Codes",
                        page: "/dashboard/marketing/cupon-codes",
                        subpage: [
                            {
                                label: "Add Coupon",
                                page: "/dashboard/marketing/coupon-codes/create"
                            }
                        ]
                    },
                ]
            }
        ]
    },
    {
        category: "AccountManagMentLinks",
        links: [
            {
                label: "Profile",
                page: "/dashboard/profile",
                subLinks: [
                    {
                        label: "View",
                        page: "/dashboard/profile"
                    },
                    {
                        label: "Change Password",
                        page: "/dashboard/profile/change-password"
                    },
                    {
                        label: "Two Factor Authentication",
                        page: "/dashboard/profile/two-factor-authentication"
                    },
                ]
            },
            {
                label: "Account Settings",
                page: "account-settings",
                subLinks: [
                    {
                        label: "General",
                        page: "/dashboard/account-settings"
                    },
                    {
                        label: "Account Details",
                        page: "/dashboard/account-settings/account-details"
                    },
                    {
                        label: "Notification",
                        page: "/dashboard/account-settings/notification"
                    }, {
                        label: "Users",
                        page: "/dashboard/account-settings/users"
                    }
                ]
            },
            {
                label: "Store Settings",
                page: "store-settings",
                subLinks: [
                    {
                        label: "General",
                        page: "/dashboard/store-settings"
                    },
                    {
                        label: "Payment",
                        page: "/dashboard/store-settings/payment"
                    },
                    {
                        label: "Invoice",
                        page: "/dashboard/store-settings/invoice"
                    },
                    {
                        label: "Domain And SSL",
                        page: "/dashboard/store-settings/domain-ssl"
                    },
                    {
                        label: "Email",
                        page: "/dashboard/store-settings/email"
                    },

                    // {
                    //     label: "Shipping",
                    //     page: "/dashboard/profile/store-settings/shipping"
                    // },
                    // {
                    //     label: "Tax",
                    //     page: "/dashboard/profile/store-settings/tax"
                    // },
                    // {
                    //     label: "Checkout",
                    //     page: "/dashboard/profile/store-settings/checkout"
                    // },

                    // {
                    //     label: "Legal",
                    //     page: "/dashboard/profile/store-settings/legal"
                    // },
                ]
            }
        ]
    }
]
