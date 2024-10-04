

import { StaticImageData } from "next/image";
import SupportOptionImages from "../assets/contactus/cardicons/index";


export interface SupportOptionData {
    image: {
        src: string | StaticImageData
        alt: string
    }
    title: string
    description: string
    button: {
        text: string
        link: string
    },
    mode?: 'light' | 'dark'
}

export const SupportOptionsData: SupportOptionData[] = [
    {
        image: {
            src: SupportOptionImages[0],
            alt: "icon1"
        },
        title: "Get a Demo",
        description: "Explore modern ecommerce for a new era with a personalized tour of our platform.",
        button: {
            text: "Request a Demo",
            link: "/"
        },
        mode: 'dark'
    },
    {
        image: {
            src: SupportOptionImages[1],
            alt: "icon2"
        },
        title: "Talk to Sales",
        description: "See how we can accelerate your success and get a sales quote for your business.",
        button: {
            text: "Let's Talk",
            link: "/"
        },
        mode: 'light'
    },
    {
        image: {
            src: SupportOptionImages[2],
            alt: "icon3"
        },
        title: "Get Support",
        description: "Our support team is available 24/7, plus get access to thousands of help articles and videos.",
        button: {
            text: "Get Support",
            link: "/"
        },
        mode: 'light'
    }
]

export interface ContactInfo {
    region: string;
    sales: {
        phoneNumber: string;
        tollFree?: boolean;
        hours: string;
    };
    support: {
        phoneNumber: string;
        hours: string;
    };
}

export const RegionalContactData: ContactInfo[] = [
    {
        region: "USA & Canada",
        sales: {
            phoneNumber: "1-888-248-9325",
            tollFree: true,
            hours: "Mon to Fri from 8am to 6pm CST"
        },
        support: {
            phoneNumber: "1-888-699-8911",
            hours: "Mon to Fri from 8am to 6pm CST"
        }
    },
    {
        region: "Australia, New Zealand & Singapore",
        sales: {
            phoneNumber: "+61 2 8188 1832",
            tollFree: true,
            hours: "Mon to Fri from 9am to 5pm AEDT"
        },
        support: {
            phoneNumber: "1800-821-758",
            hours: "Mon to Fri from 9am to 5pm AEDT"
        }
    },
    {
        region: "United Kingdom & Europe",
        sales: {
            phoneNumber: "0808-1893323",
            tollFree: true,
            hours: "Mon to Fri from 9am to 6pm GMT"
        },
        support: {
            phoneNumber: "0808-189-1224",
            hours: "Mon to Fri from 9am to 6pm GMT"
        }
    },
    {
        region: "International",
        sales: {
            phoneNumber: "+1-512-758-7588",
            tollFree: true,
            hours: "Mon to Fri from 9am to 5pm CST (3pm to 11pm GMT)"
        },
        support: {
            phoneNumber: "+1-512-758-7588",
            hours: "Mon to Fri from 9am to 5pm CST (3pm to 11pm GMT)"
        }
    }
];
