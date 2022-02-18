export interface ReqBasket {
    perPage: number;
    page: number;
}

export interface ResBasket {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    data: DataResBasket[];
}

export interface DataResBasket {
    id: number;
    productName: string;
    price: string;
    volume: string;
    total: string;
    createdAt: string;
    updatedAt: string;
    customerId: number;
    stockId: number;
}


export interface ReqUserBasket {
    id: number;
}

export interface ResUserBasket {
    data: DataResUserBasket[];
}

export interface DataResUserBasket {
    id: number;
    productName: string;
    price: string;
    volume: string;
    total: string;
    createdAt: string;
    updatedAt: string;
    customerId: number;
    stockId: number;
}

export interface ReqCreateBasket {
    productName: string;
    price: number;
    volume: string;
    total: number;
    customerId: string;
    stockId: string;
}

export interface ResCreateBasket {
    id: number;
    productName: string;
    price: number;
    volume: string;
    total: number;
    customerId: string;
    stockId: string;
    updatedAt: string;
    createdAt: string;
}

export interface ReqUpdateBasket {
    id: number;
    volume: string;
    total: number;
}

export interface ResUpdateBasket {
    id: number;
    productName: string;
    price: string;
    volume: string;
    total: string;
    createdAt: string;
    updatedAt: string;
    customerId: number;
    stockId: number;
}
