
interface AboutUsTopType {
    title: string;
    description: Array<{
        content: string;
        link?: string;
        color?: string;
        className?: string;
        hoverColor?: string;
    }>;
}

import banner1 from "@/assets/aboutUs/banner.webp"
import banner2 from "@/assets/aboutUs/banner2.webp"
import joinus from "@/assets/aboutUs/joinus.webp"

export const aboutUsTop: AboutUsTopType = {
    title: "Who We Are and What We Do",
    description: [
        {
            content:
                "BigCommerce (Nasdaq: BIGC) is a leading open SaaS and composable ecommerce platform that empowers brands and retailers of all sizes to build, innovate and grow their businesses online. BigCommerce provides its customers sophisticated enterprise-grade functionality, customization and performance with simplicity and ease-of-use. Tens of thousands of B2C and B2B companies across 150 countries and numerous industries rely on BigCommerce, including Burrow, Coldwater Creek, Francesca’s, Harvey Nichols, King Arthur Baking Co., MKM Building Supplies, United Aqua Group and Uplift Desk. For more information, please visit ",
        },
        {
            content: "www.bigcommerce.com",
            link: "https://www.bigcommerce.com",
            color: "#0B42CC",
            hoverColor: "#121118",
            className: "text-[#0B42CC]  hover:text-[#121118]"
        },
        {
            content: "or follow us on Twitter, ",
        },
        {
            content: "X",
            link: "/",
            className: "text-[#0B42CC]  hover:text-[#121118]"
        },
        {
            content: "and ",
        },
        {
            content: "LinkedIn",
            link: "/",
            className: "text-[#0B42CC]  hover:text-[#121118]"
        },
    ],
};



export const aboutUsBanner = [
    {
        img: banner1,
        alt: "banner1",
    },
    {
        img: banner2,
        alt: "banner2",
    },
    {
        img: joinus,
        alt: "joinus",
    },

];

interface servicesAndExperienceType {
    title: string;
    numberRepresentation: Array<{
        number: string;
        content: string;
    }>;
    description: string;
    moreinfo: Array<{
        title: string;
        link?: string;
        className?: string;
    }>;
    latestNews: Array<{
        title: string;
        link: string;
        className?: string;
    }>;
}

export const servicesAndExperience: servicesAndExperienceType = {
    title: "BigCommerce by the Numbers",
    numberRepresentation: [
        {
            number: "2009",
            content: "Year Founded",
        },
        {
            number: "Tens of Thousands",
            content: "Merchants",
        },
        {
            number: "2020 IPO",
            content: "NASDAQ: BIGC",
        },
        {
            number: "1000+",
            content: "Full-Time Employees",
        },
        {
            number: "2,800",
            content: "Agency and Technology Partners",
        },
        {
            number: "150+",
            content: "Countries Served"
        }

    ],
    description: "We’re dedicated to our merchants, guided by our values and powered by our people. This is the driving force behind our success. It’s what has taken us from a 2-person startup to a global team of hundreds helping retailers make billions of dollars in sales. ",
    moreinfo: [
        {
            title: "For more insights, read our"
        },
        {
            title: "2023 Annual Report",
            className: "text-[#0B42CC]  hover:text-[#121118]",
            link: "/",
        }
    ],
    latestNews: [
        {
            title: "See the latest Bigcommerce news",
            link: "/news",
            className: "text-[#0B42CC]  hover:text-[#121118]"
        }
    ]
}

interface visionType {
    title: string;
    content: string;
}

export const visionContent: visionType[] = [
    {
        title: "Customers First",
        content: "Our company exists to help merchants sell more. We make every decision and measure every outcome based on how well it serves our customers."
    },
    {
        title: "Team on a Mission",
        content: "BigCommerce is made up of amazing individuals, but it’s only through teamwork that we achieve greatness. We’re committed to helping our customers by working together with equal parts humility and ambition."
    },
    {
        title: "Think Big",
        content: "Being the world's leading commerce platform requires unrivaled vision, innovation and execution. We never settle. We challenge our ideas of what’s possible to better meet the needs of our customers."
    },
    {
        title: "Act with Integrity",
        content: "We’re honest, transparent and committed to doing what’s best for our customers and our company. We openly collaborate in pursuit of the truth. We have no tolerance for politics, hidden agendas or passive-aggressive behavior."
    },
    {
        title: "Make a Difference Every Day",
        content: "We constantly push ourselves to be our best. We focus on solutions and arrive every day inspired to make an impact through our talents, passion and hard work."
    }
]

interface insideContentType {
    content: string;
}

export const insideContent: insideContentType[] = [
    {
        content: "Our employees bring the BigCommerce mission to life by empowering a community of merchants to reach their fullest potential. We believe in the same unlimited potential for our employees. "
    },
    {
        content: "At BigCommerce, employees own their personal development through hands-on experience, stepping up to new opportunities, and the chance to contribute on projects that are redefining the ecommerce industry."
    },
    {
        content: "Here’s what a day in the life of a BigCommerce employee looks like."
    }
]


export const companyValues = {
    "Belonging": "We foster a culture that encourages the inclusion of every employee by celebrating our individuality and our common values that bring us together. We strive to create an environment in which all employees can bring their whole, best, authentic selves to work and for everyone to feel a sense of acceptance and encouragement to come as they are.",
    "Respect": "Our differences make us unique and create the diversity we value. We commit to creating an environment where each of us is treated with response and dignity and the expression of each individual's perspective, thoughts and ideas is encouraged.",
    "EqualOpportunity": "Greatness is inherent in all people, no matter their demographic background or personal experiences. We will take action to ensure that every individual has an equal opportunity to grow and achieve their maximum potential."
}


import location1 from "@/assets/aboutUs/location_images/image1.webp"
import location2 from "@/assets/aboutUs/location_images/image2.webp"
import location3 from "@/assets/aboutUs/location_images/image3.webp"
import location4 from "@/assets/aboutUs/location_images/image4.webp"
import location5 from "@/assets/aboutUs/location_images/image5.webp"
import { StaticImageData } from "next/image";


export interface locationContentType {
    image: {
        src: string | StaticImageData;
        alt: string;
    };
    title: string;
    description: string;
}

export const locationContent: locationContentType[] = [
    {
        image: {
            src: location1,
            alt: "Sydney"
        },
        title: "Austin, Texas / Four Points",
        description: "Our headquarters is set amongst trees and nature trails in the beautiful hills of Austin. We're located only miles from the live music capital of Texas that is downtown and just a few minutes from the leisure and sporting fun of Lake Travis. The offices of Four Points is home to the BigCommerce Sales, Support, Operations, G&A Support, Marketing and Design teams."
    },
    {
        image: {
            src: location2,
            alt: "Sydney"
        },
        title: "San Francisco, California",
        description: "Our San Francisco office is in the heart of the Financial District, close to a BART stop and surrounded by great coffee shops, restaurants and bars. Designed from the get-go to host Tech Talks, we frequently bring in industry leaders to discuss the latest trends in commerce technology."
    },
    {
        image: {
            src: location3,
            alt: "Sydney"
        },
        title: "Sydney, Australia",
        description: "Our Sydney office is located in the CBD. It’s just around the corner from Pitt Street Mall and Martin Place, and a short stroll from great cafes, pubs, parks, and restaurants. Our office reflects our innovative, unique, and vibrant surroundings."
    },
    {
        image: {
            src: location4,
            alt: "Sydney"
        },
        title: "London, United Kingdom",
        description: "The BigCommerce London office is home to a thriving Sales, Marketing and Professional Services teams. It’s centrally located in the hustle and bustle of the city near the St. Paul’s Cathedral, London Bridge and the Tate Museum."
    },
    {
        image: {
            src: location5,
            alt: "Sydney"
        },
        title: "Kyiv, Ukraine",
        description: "Our Kyiv site can be found in the Shevchenkivskyi district near one of the most beautiful historical areas, Podil, just off the Dnipro river. Close to the heart of the city, it is just a few minutes’ walk from parks, restaurants, cafes, and coffee shops as well as the metro line, Dorohozhychi."
    }
]

//  LeadersPageData


import images from "@/assets/aboutUs/experiencedExecutivesImages";


export interface commonInfoCardWithActionType {
    image: {
        src: string | StaticImageData;
        alt: string;
    };
    name?: string;
    title?: {
        text: string;
        color?: string;
    }
    designation?: string;
    description?: Array<{
        text: string,
        link?: string;
        className?: string
    }>;
    button?: {
        text: string;
        link: string;
    };
}

export const experiencedExecutives: commonInfoCardWithActionType[] = [
    {
        image: {
            src: images[0],
            alt: "Sydney"
        },
        name: "Brent Bellm",
        designation: "Chief Executive Officer",
        description: [{ text: "Brent Bellm is the Chief Executive Officer of BigCommerce. Brent has more than 20 years of experience in ecommerce, software and technology, and has held executive leadership roles at HomeAway, PayPal and eBay. He is a graduate of Stanford University and the Stanford Graduate School of Business." }],
        button: {
            text: "View Bio",
            link: "https://www.bigcommerce.com/company/leadership/brent-bellm/"
        }
    },
    {
        image: {
            src: images[1],
            alt: "Sydney"
        },
        name: "Daniel Lentz",
        designation: "Chief Financial Officer",
        description: [{ text: "Daniel is the Chief Financial Officer of BigCommerce. He has over two decades of experience guiding the financial and operational functions within industry leaders including Dell, Procter & Gamble and RetailMeNot." }],
        button: {
            text: "View Bio",
            link: "https://www.bigcommerce.com/company/leadership/daniel-lentz/"
        }
    },
    {
        image: {
            src: images[2],
            alt: "Sydney"
        },
        name: "Travis Hess",
        designation: "President",
        description: [{ text: "Travis became President of BigCommerce in May 2024. With more than 15 years of senior leadership positions at top commerce agencies and consultancies including Accenture, Travis serves as BigCommerce’s go-to-market leader to drive top-line growth and profitability." }],
        button: {
            text: "View Bio",
            link: "https://www.bigcommerce.com/company/leadership/travis-hess/"
        }
    },
    {
        image: {
            src: images[3],
            alt: "Sydney"
        },
        name: "Russell Klein",
        designation: "Chief Commercial Officer",
        description: [{ text: "Russell is the Chief Commercial Officer of BigCommerce. He brings more than 20 years of management experience spanning M&A, investments, joint ventures, business and corporate development." }],
        button: {
            text: "View Bio",
            link: "https://www.bigcommerce.com/company/leadership/russell-klein/"
        }
    },
    {
        image: {
            src: images[4],
            alt: "Sydney"
        },
        name: "Lisa Eggerton",
        designation: "Chief Marketing Officer",
        description: [{ text: "Lisa is the Chief Marketing Officer of BigCommerce. She has 20+ years of experience scaling high-growth companies with a focus on enterprise SaaS. In her multiple executive roles, she's been responsible for setting company vision and strategy, driving business performance through organic growth, global expansion and M&A, and navigating corporate exits." }],
        button: {
            text: "View Bio",
            link: "https://www.bigcommerce.com/company/leadership/lisa-eggerton/"
        }
    },
    {
        image: {
            src: images[5],
            alt: "Sydney"
        },
        name: "Brian Dhatt",
        designation: "Chief Technology Officer, BigCommerce President, Feedonomics",
        description: [{ text: "Brian is the Chief Technology Officer at BigCommerce and President at Feedonomics, a BigCommerce company. At BigCommerce, Brian leads all aspects of product and engineering with teams across offices in Austin, San Francisco, Sydney, and Kyiv. At Feedonomics, Brian leads all aspects of the business with a team distributed globally." }],
        button: {
            text: "View Bio",
            link: "https://www.bigcommerce.com/company/leadership/brian-dhatt/"
        }
    },
    {
        image: {
            src: images[6],
            alt: "Sydney"
        },
        name: "Rosie Rivel",
        designation: "Chief Information Officer",
        description: [{ text: "Rosie is the Chief Information Officer of BigCommerce. She has 25+ years of experience as an executive professional in the IT industry, including senior roles at Kelly Services, Delphi Medical and Deloitte Consulting." }],
        button: {
            text: "View Bio",
            link: "https://www.bigcommerce.com/company/leadership/rosie-rivel/"
        }
    },
    {
        image: {
            src: images[7],
            alt: "Sydney"
        },
        name: "Hubert Ban",
        designation: "Chief Accounting Officer",
        description: [{ text: "Hubert is BigCommerce’s Chief Accounting Officer. He brings over 20 years of experience in accounting and reporting roles at publicly traded companies and Big 4 accounting firms." }],
        button: {
            text: "View Bio",
            link: "https://www.bigcommerce.com/company/leadership/hubert-ban/"
        }

    },
    {
        image: {
            src: images[8],
            alt: "Sydney"
        },
        name: "Chuck Cassidy",
        designation: "General Counsel",
        description: [{ text: "Chuck is BigCommerce’s General Counsel. He has been with BigCommerce since 2017 and has been responsible for legal management of numerous business units and strategic priorities of the organization. He has broad experience representing growth-stage software and technology companies and previously practiced corporate and transactional law at Vinson & Elkins, L.L.P." }],
        button: {
            text: "View Bio",
            link: "https://www.bigcommerce.com/company/leadership/chuck-cassidy/"
        }
    },
    {
        image: {
            src: images[9],
            alt: "Sydney"
        },
        name: "Troy Cox",
        designation: "Chief Product Officer",
        description: [{ text: "Troy is the Chief Product Officer for BigCommerce. He brings more than 20 years of product and engineering leadership experience across both startup and established public companies including Microsoft." }],
        button: {
            text: "View Bio",
            link: "https://www.bigcommerce.com/company/leadership/troy-cox"
        }
    },
    {
        image: {
            src: images[10],
            alt: "Sydney"
        },
        name: "Chief Information Security Officer",
        designation: "Chief Information Security Officer",
        description: [{ text: "Dan is Chief Information Security Officer at BigCommerce. He has over 25 years of experience in the IT and cybersecurity industries. Prior to his role at BigCommerce, Dan held several leadership positions at companies such as the Home Depot, the Retail & Hospitality ISAC, Arbor Networks, and TippingPoint." }],
        button: {
            text: "View Bio",
            link: "https://www.bigcommerce.com/company/leadership/dan-wiley/"
        }
    },
    {
        image: {
            src: images[11],
            alt: "Sydney"
        },
        name: "Becky Logan",
        designation: "Senior Vice President of People",
        description: [{ text: "Becky is the Senior Vice President of People at BigCommerce, where she oversees the company’s global talent management, HR operations and culture and employee experience functions. She has over 20 years of experience in human resources across technology and hospitality companies." }],
        button: {
            text: "View Bio",
            link: "https://www.bigcommerce.com/company/leadership/becky-logan/"
        }

    }
]


import AdvisorImages from "@/assets/aboutUs/worldClassAdvisor/index";



export const WorldClassAdvisorsData: commonInfoCardWithActionType[] = [
    {
        image: {
            src: AdvisorImages[0],
            alt: "Sydney"
        },
        name: "Satish Malhotra",
        designation: "Satish Malhotra"
    },
    {
        image: {
            src: AdvisorImages[1],
            alt: "Sydney"
        },
        name: "Sally Gilligan",
        designation: "Gap Inc."
    },
    {
        image: {
            src: AdvisorImages[2],
            alt: "Sydney"
        },
        name: "Larry Bohn",
        designation: "General Catalyst"
    },
    {
        image: {
            src: AdvisorImages[3],
            alt: "Sydney"
        },
        name: "Jeff Richards",
        designation: "GGV Captial"
    },
    {
        image: {
            src: AdvisorImages[4],
            alt: "Sydney"
        },
        name: "Don Clarke",
        designation: "Plex Systems, Inc."
    },
    {
        image: {
            src: AdvisorImages[5],
            alt: "Sydney"
        },
        name: "Ellen Siminoff",
        designation: "Board of Directors Zynga, Shmoop, Discovery Education, Solarwinds"
    }

]


import experiencedExecutivesImages from "@/assets/aboutUs/companyRecognitions/index"

export const CompanyRecognitionsContent: commonInfoCardWithActionType[] = [
    {
        image: {
            src: experiencedExecutivesImages[0],
            alt: "image1"
        },
        title: {
            text: "IDC MarketScapes",
            color: "#0B42CC"
        },
        description: [{ text: "BigCommerce was named a Leader in the IDC MarketScape: Worldwide B2B Digital Commerce Applications for MidMarket Growth 2023–2024 Vendor Assessment as well as a Leader in the IDC MarketScape: Worldwide Enterprise B2C Digital Commerce Applications 2024 Vendor Assessment." }],
        button: {
            text: "Learn More",
            link: "/",
        }
    },
    {
        image: {
            src: experiencedExecutivesImages[1],
            alt: "image2"
        },
        title: {
            text: "Gartner Magic Quadrant",
            color: "#0B42CC"
        },
        description: [{
            text: "Gartner recognized BigCommerce as a Challenger in the 2023 Gartner Magic Quadrant for Digital Commerce Platform for the fourth consecutive year."
        }],
        button: {
            text: "Learn More",
            link: "/",
        }
    },
    {
        image: {
            src: experiencedExecutivesImages[2],
            alt: "image3"
        },
        title: {
            text: "Forrester Wave",
            color: "#0B42CC"
        },
        description: [{ text: "BigCommerce was named a Strong Performer by Forrester Research in both The Forrester Wave™: B2C Commerce Solutions and The Forrester Wave™: B2B Commerce Solutions reports for 2022." }],
        button: {
            text: "Learn More",
            link: "/",
        }
    },
    {
        image: {
            src: experiencedExecutivesImages[3],
            alt: "image4"
        },
        title: {
            text: "TrustRadius",
            color: "#0B42CC"
        },
        description: [{ text: "BigCommerce was recognized as a Top Rated Ecommerce Platform award from TrustRadius for the fourth consecutive year. Based on hundreds of user reviews, the award affirms our platform’s easy-to-use, enterprise-grade functionality, customization, and performance, enabling online businesses to scale and accelerate growth." }],
        button: {
            text: "Learn More",
            link: "/",
        }

    },
    {
        image: {
            src: experiencedExecutivesImages[4],
            alt: "image5"
        },
        title: {
            text: "Paradigm B2B Combines",
            color: "#0B42CC"
        },
        description: [{ text: "BigCommerce achieved 24 out of 24 total medals in the 2023 Paradigm B2B Combines for Digital Commerce Solutions (Enterprise and Midmarket Editions), surpassing previous analyst evaluations for the fourth consecutive year. BigCommerce increased its rankings in a total of six categories in both Editions, solidifying its position as a preferred ecommerce platform for midmarket and enterprise B2B brands looking to grow and scale their business." }],
        button: {
            text: "Learn More",
            link: "/",
        }
    },
    {
        image: {
            src: experiencedExecutivesImages[5],
            alt: "image6"
        },
        title: {
            text: "PEAK Matrix",
            color: "#0B42CC"
        },
        description: [{ text: "BigCommerce was named a Major Contender in Everest Group’s 2023 Digital Commerce Platform PEAK Matrix®. BigCommerce scored second to highest among competitors in both Visibility and Capability." }],
        button: {
            text: "Learn More",
            link: "/",
        }
    },
    {
        image: {
            src: experiencedExecutivesImages[6],
            alt: "image7"

        },
        title: {
            text: "INC. Power Partner",
            color: "#0B42CC"
        },
        description: [
            {
                text: "BigCommerce was named to"
            },
            {
                text: "Inc. Business Media’s 2023 Power Partner Awards",
                className: "text-[#0B42CC]  hover:text-[#121118]"
            },
            {
                text: "list, recognizing us as a trusted business partner in the ecommerce category for our ongoing commitment to equipping brands and retailers with enterprise-grade functionality, customization, and performance to unleash innovation and drive growth.",

            }
        ],
        button: {
            text: "Learn More",
            link: "/",
        }
    },
    {
        image: {
            src: experiencedExecutivesImages[7],
            alt: "image8"
        },
        title: {
            text: "Inc's Best-Led Companies 2021 - USA",
        },
        description: [{ text: "BigCommerce has been named to Inc. Magazine’s first-ever Best-Led Companies list for midmarket 2021. The select, data-driven list is comprised of the very strongest U.S. firms with revenue of $50 million to $2 billion and is Inc.’s first recognition list to honor both public and private companies." }],

    },
    {
        image: {
            src: experiencedExecutivesImages[8],
            alt: "image9"
        },
        title: {
            text: "MACH Impact Award",
            color: "#0B42CC"
        },
        description: [
            {
                text: "BigCommerce customer MKM Building Supplies won a 2023 MACH Impact Award from the"
            },
            {
                text: "MACH Alliance",
                className: "text-[#0B42CC]  hover:text-[#121118]"
            },
            {
                text: " a group of independent tech companies dedicated to advocating for open, best-of-breed technology ecosystems. The "
            },
            {
                text: "MACH Impact Awards ",
                className: "text-[#0B42CC]  hover:text-[#121118]"
            },
            {
                text: "honor the most globally innovative and impactful technology projects that utilize a MACH (microservices-based, API-first, Cloud native SaaS, Headless) strategy."
            }
        ],
        button: {
            text: "Learn More",
            link: "/",
        }
    },
    {
        image: {
            src: experiencedExecutivesImages[9],
            alt: "image10"
        },
        title: {
            text: "Vendors in Partnership North America",
            color: "#0B42CC"
        },
        description: [{
            text: "BigCommerce was honored with the North America Vendors in Partnership (VIP) Award for 2024 Best Commerce or Multi-Vendor Platform, recognizing solution providers that power the retail ecosystem and new ways that partnerships are formed and challenges are overcome. They acknowledge service to the retail industry and celebrate a willingness to transform from within, create deep and perceptive partnerships, and great solutions."
        }],
        button: {
            text: "Learn More",
            link: "/",
        }
    },
    {
        image: {
            src: experiencedExecutivesImages[10],
            alt: "image11"
        },
        title: {
            text: "Vendors in Partnership Australia﻿",
            color: "#0B42CC"
        },
        description: [{
            text: "BigCommerce received two 2023 Vendors in Partnership (VIP) Awards from Retail Global's Vendors in Partnership Australia, The VIP Challenger Award and Best Cross-Industry Collaboration/360 Degree Solution, for its disruptive innovation with its open SaaS, partner-centric approach that equips merchants with a composable foundation for ambitious growth. BigCommerce also received the 2022 Solution Provider of the Year by Vendors in Partnership (VIP)."
        }],
        button: {
            text: "Learn More",
            link: "/",
        }
    },
    {
        image: {
            src: experiencedExecutivesImages[11],
            alt: "image12"
        },
        title: {
            text: "G2",
            color: "#0B42CC"
        },
        description: [{
            text: "Using reviews from the user community and evaluating the platform's ease of use and quality of support, BigCommerce was named one of the best ecommerce platforms for small business owners by G2 Crowd."
        }],
        button: {
            text: "Learn More",
            link: "/",
        }
    }
]


import BestPlacesToWorkImages from "@/assets/aboutUs/BestPlacestoWorkImages/index";

export const BestPlacesToWorkData: commonInfoCardWithActionType[] = [
    {
        image: {
            src: BestPlacesToWorkImages[0],
            alt: "image1"
        },
        title: {
            text: "Great Place to Work - USA"
        },
        description: [{
            text: "BigCommerce has been certified as a Great Place to Work in the US for 2024-2025. The study is conducted based on one of the world's most comprehensive assessments of workplace culture by Great Places to Work."
        }]
    },
    {
        image: {
            src: BestPlacesToWorkImages[1],
            alt: "image2"
        },
        title: {
            text: "Great Place to Work - AUS",
        },
        description: [{
            text: "BigCommerce has been certified as a Great Place to Work in Australia for 2024-2025. The study is conducted based on one of the world's most comprehensive assessments of workplace culture by Great Places to Work."
        }]
    },
    {
        image: {
            src: BestPlacesToWorkImages[2],
            alt: "image3",
        },
        title: {
            text: "Great Place to Work - UK",
        },
        description: [{
            text: "BigCommerce has been certified as a Great Place to Work in the UK for 2023-2024. The study is conducted based on one of the world's most comprehensive assessments of workplace culture by Great Places to Work."
        }]
    },
    {
        image: {
            src: BestPlacesToWorkImages[3],
            alt: "image4",
        },
        title: {
            text: "2024 Best Places to Work",
        },
        description: [{
            text: "BigCommerce has been named a 2024 Best Places to Work by Built In."
        }]
    }
]