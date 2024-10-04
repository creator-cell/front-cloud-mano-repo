export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    state: string;
};

export const fakeData: User[] = [
    {
        id: '9s41rp',
        firstName: 'Kelvin',
        lastName: 'Langosh',
        email: 'Jerod14@hotmail.com',
        state: 'Ohio',
    },
    {
        id: '08m6rx',
        firstName: 'Molly',
        lastName: 'Purdy',
        email: 'Hugh.Dach79@hotmail.com',
        state: 'Rhode Island',
    },
    {
        id: '5ymtrc',
        firstName: 'Henry',
        lastName: 'Lynch',
        email: 'Camden.Macejkovic@yahoo.com',
        state: 'California',
    },
    {
        id: 'ek5b97',
        firstName: 'Glenda',
        lastName: 'Douglas',
        email: 'Eric0@yahoo.com',
        state: 'Montana',
    },
    {
        id: 'xxtydd',
        firstName: 'Leone',
        lastName: 'Williamson',
        email: 'Ericka_Mueller52@yahoo.com',
        state: 'Colorado',
    },
    {
        id: 'wzxj9m',
        firstName: 'Mckenna',
        lastName: 'Friesen',
        email: 'Veda_Feeney@yahoo.com',
        state: 'New York',
    },
    {
        id: '21dwtz',
        firstName: 'Wyman',
        lastName: 'Jast',
        email: 'Melvin.Pacocha@yahoo.com',
        state: 'Montana',
    },
    {
        id: 'o8oe4k',
        firstName: 'Janick',
        lastName: 'Willms',
        email: 'Delfina12@gmail.com',
        state: 'Nebraska',
    },
];

//50 us states array
export const usStates = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
    'Puerto Rico',
];


interface VariantOption {
    optionName: string;
    optionType: 'dropdown' | 'radio' | 'switch';
    optionValues: string[];
}

interface Variation {
    SKU: string;
    weight: number;
    quantity: number;
    height: number;
    width: number;
    length: number;
    images: string[]; // Assuming images are URLs or paths; adjust as necessary.
    tags: string[];
}

export interface Variant {
    variantOptions: VariantOption[];
    variations: Variation[];
}

const dummyData: Variant[] = [
    {
        variantOptions: [
            {
                optionName: "Color",
                optionType: "dropdown",
                optionValues: ["Red", "Blue", "Green"],
            },
            {
                optionName: "Size",
                optionType: "radio",
                optionValues: ["S", "M", "L"],
            },
        ],
        variations: [
            {
                SKU: "SKU123",
                weight: 1.2,
                quantity: 10,
                height: 10,
                width: 5,
                length: 15,
                images: [],
                tags: ["tag1", "tag2"],
            },
            {
                SKU: "SKU124",
                weight: 1.5,
                quantity: 20,
                height: 12,
                width: 6,
                length: 18,
                images: [],
                tags: ["tag2", "tag3"],
            },
        ],
    },
    {
        variantOptions: [
            {
                optionName: "Material",
                optionType: "switch",
                optionValues: ["Cotton", "Polyester"],
            },
        ],
        variations: [
            {
                SKU: "SKU125",
                weight: 1.0,
                quantity: 15,
                height: 8,
                width: 4,
                length: 12,
                images: [],
                tags: ["tag3"],
            },
            {
                SKU: "SKU126",
                weight: 1.3,
                quantity: 25,
                height: 9,
                width: 5,
                length: 14,
                images: [],
                tags: ["tag4"],
            },
        ],
    },
];

