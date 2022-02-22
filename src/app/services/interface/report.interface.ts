export interface ReqCreateReport {
    orderCode: string;
    volume: number;
    price: string;
    orderStatus: number;
    location: string;
    basketId: string;
    customerId: string;
    stocksId: string;
}

export interface ResCreateReport {
    id: number;
    orderCode: string;
    volume: number;
    price: string;
    orderStatus: number;
    location: string;
    basketId: string;
    customerId: string;
    stocksId: string;
    updatedAt: string;
    createdAt: string;
}

export interface ReqGetReport {
    perPage: number;
    page: number;
}

export interface ResGetReport {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    data: DataResGetReport[];
}

export interface DataResGetReport {
    id: number;
    orderCode: string;
    volume: string;
    price: string;
    orderStatus: string;
    parcelNumber: string;
    createdAt: string;
    updatedAt: string;
    basketId: number;
    customerId: number;
    stocksId: number;
    customer: Customer;
    stocks: Stocks;
    imgReport: ImgReport[];
}

export interface Customer {
    id: number;
    userName: string;
    passWord: string;
    firstName: string;
    lastName: string;
    gmail: string;
    phoneNumber: string;
    status: number;
    createdAt: string;
    updatedAt: string;
}

export interface Stocks {
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

export interface ImgReport {
    id: number;
    imgName: string;
    imgPre: number;
    imgGallery: any;
    createdAt: string;
    updatedAt: string;
    reportId: number;
}



export interface ReqUpdateReport {
    id: number;
    orderStatus: string;
}

export interface ResUpdateReport {
    id: number;
    orderCode: string;
    volume: string;
    price: string;
    orderStatus: string;
    parcelNumber: any;
    createdAt: string;
    updatedAt: string;
    basketId: number;
    customerId: number;
    stocksId: number;
}

export interface ReqUpdateReport2 {
    id: number;
    orderStatus: string;
    parcelNumber: string;
}

export interface ResUpdateReport2 {
    id: number;
    orderCode: string;
    volume: string;
    price: string;
    orderStatus: string;
    parcelNumber: any;
    createdAt: string;
    updatedAt: string;
    basketId: number;
    customerId: number;
    stocksId: number;
}

export interface ReqUserReport {
    id: number;
    orderStatus: number;
}

export interface ResUserReport {
    data: DataResUserReport[];
}

export interface DataResUserReport {
    id: number;
    orderCode: string;
    volume: string;
    price: string;
    orderStatus: string;
    location: string;
    parcelNumber: any;
    createdAt: string;
    updatedAt: string;
    basketId: number;
    customerId: number;
    stocksId: number;
    customer: Customer;
    stocks: Stocks;
}

export interface Customer {
    id: number;
    userName: string;
    passWord: string;
    firstName: string;
    lastName: string;
    gmail: string;
    phoneNumber: string;
    status: number;
    createdAt: string;
    updatedAt: string;
}

export interface Stocks {
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


export interface ReqUserDataReport {
    id: number;
}

export interface ResUserDataReport {
    data: DataResUserDataReport[];
}

export interface DataResUserDataReport {
    id: number;
    orderCode: string;
    volume: string;
    price: string;
    orderStatus: string;
    location: string;
    parcelNumber: string;
    createdAt: string;
    updatedAt: string;
    basketId: number;
    customerId: number;
    stocksId: number;
    customer: Customer;
    stocks: Stocks;
}

export interface Customer {
    id: number;
    userName: string;
    passWord: string;
    firstName: string;
    lastName: string;
    gmail: string;
    phoneNumber: string;
    status: number;
    createdAt: string;
    updatedAt: string;
}

export interface Stocks {
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

export interface ResUploadReport {
    id: number;
    imgName: string;
    reportId: string;
    imgPre: number;
    updatedAt: string;
    createdAt: string;
}
