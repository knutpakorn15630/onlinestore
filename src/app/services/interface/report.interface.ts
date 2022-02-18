export interface ReqCreateReport {
    orderCode: string;
    volume: number;
    price: string;
    orderStatus: number;
    parcelNumber: string;
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
    parcelNumber: string;
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
