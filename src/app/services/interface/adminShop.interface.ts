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
    customer: Customer;
    imgShop: ImgShop[];
}
export interface Customer {
    id: number;
    firstName: string;
    lastName: string;
    gmail: string;
    phoneNumber: string;
}
export interface ImgShop {
    id: number;
    imgName: string;
    imgPre: number;
    imgGallery: any;
    createdAt: string;
    updatedAt: string;
    shopId: number;
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


export interface ResUploadShop {
    id: number;
    imgName: string;
    shopId: string;
    imgPre: number;
    updatedAt: string;
    createdAt: string;
}

export interface ReqGetUserShop {
    id: number;
}

export interface ResGetUserShop {
    data: DataReqGetUserShop[];
}

export interface DataReqGetUserShop {
    id: number;
    shopName: string;
    createdAt: string;
    updatedAt: string;
    customerId: number;
}



