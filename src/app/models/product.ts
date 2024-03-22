export interface Product {
    _id: string;
    title: string;
    slug: string;
    image?: string;
    price: number;
    category: any | string;
    description: string;
    createdBy: any | string;
    createdAt: string;
    updatedAt: string;
}

