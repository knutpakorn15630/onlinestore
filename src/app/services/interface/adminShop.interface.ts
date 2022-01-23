export interface ReqShop {
    perPage: number;
    page: number;
}
export interface ResShop {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    data: DataShop[];
}
export interface DataShop {
    id: number;
    shopName: string;
    createdAt: string;
    updatedAt: string;
    customerId: number;
}


export interface ReqCreateShop {
    shopName: string;
    customerId: number;
}
export interface ResCreateShop {
    id: number;
    shopName: string;
    customerId: number;
    updatedAt: string;
    createdAt: string;
}


export interface ReqUpdateShop {
    id: number;
    shopName: string;
}
export interface ResUpdateShop {
    id: number;
    shopName: string;
    createdAt: string;
    updatedAt: string;
    customerId: number;
}




