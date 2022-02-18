export interface ReqStock {
    perPage: number;
    page: number;
}
export interface ResStock {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    data: DataStock[];
}

export interface DataStock {
    id: number;
    productName: string;
    volume: string;
    price: string;
    details: string;
    createdAt: string;
    updatedAt: string;
    shopId: number;
    typeStockId: number;
    shop: Shop;
    typeStock: TypeStock;
    imgStock: ImgStock[];
}

export interface Shop {
    id: number;
    shopName: string;
}

export interface TypeStock {
    id: number;
    typeName: string;
}

export interface ImgStock {
    id: number;
    imgName: string;
    imgPre: number;
    createdAt: string;
    updatedAt: string;
    stockId: number;
}

export interface ReqUpdateStock {
    id: number;
    productName: string;
    volume: string;
    price: string;
    details: string;
}

export interface ResUpdateStock {
    id: number;
    productName: string;
    volume: string;
    price: string;
    details: string;
    createdAt: string;
    updatedAt: string;
    shopId: number;
    typeStockId: number;
}


export interface ReqCreateStock {
    productName: string;
    volume: string;
    price: string;
    details: string;
    shopId: string;
    typeStockId: string;
}
export interface ResCreateStock {
    id: number;
    productName: string;
    volume: string;
    price: string;
    details: string;
    shopId: string;
    typeStockId: string;
    updatedAt: string;
    createdAt: string;
}

export interface ResUploadStock {
    msg: string;
}

export interface ReqUserStock {
    id: number;
}

export interface ResUserStock {
    data: DataReqUserStock[];
}

export interface DataReqUserStock {
    id: number;
    productName: string;
    volume: string;
    price: string;
    details: string;
    createdAt: string;
    updatedAt: string;
    shopId: number;
    typeStockId: number;
    imgStock: ImgStock[];
    typeStock: TypeStock;
    shop: Shop;
}

export interface ImgStock {
    id: number;
    imgName: string;
    imgPre: number;
    createdAt: string;
    updatedAt: string;
    stockId: number;
}

export interface TypeStock {
    id: number;
    typeName: string;
}

export interface Shop {
    id: number;
    shopName: string;
}
