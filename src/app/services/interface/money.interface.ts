export interface ReqCreateMoney {
    totalMoney: number;
    StatusMoney: number;
    withdrawMoney: number;
    reportId: number;
    shopId: number;
    customerId: number;
}

export interface ResCreateMoney {
    id: number;
    totalMoney: number;
    withdrawMoney: number;
    reportId: number;
    shopId: number;
    updatedAt: string;
    createdAt: string;
}

export interface ReqGetMoney {
    perPage: number;
    page: number;
}

export interface ResGetMoney {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    data: DataReqGetMoney[];
}

export interface DataReqGetMoney {
    id: number;
    totalMoney: string;
    withdrawMoney: string;
    createdAt: string;
    updatedAt: string;
    reportId: number;
    shopId: number;
    customerId: number;
    addressId: number;
    banksId: number;
    shop: Shop;
    customer: Customer;
    address: Address;
    banks: Banks;
}

export interface Shop {
    id: number;
    shopName: string;
    createdAt: string;
    updatedAt: string;
    customerId: number;
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

export interface Address {
    id: number;
    addressName: string;
    createdAt: any;
    updatedAt: any;
    customerId: number;
}

export interface Banks {
    id: number;
    bankName: string;
    firstName: string;
    lastName: string;
    typeBk: string;
    accountNumber: string;
    branch: string;
    createdAt: string;
    updatedAt: string;
    customerId: number;
}

export interface ReqUpdateMoney {
    id: number;
    StatusMoney: number;
}

export interface ResUpdateMoney {
    id: number;
    totalMoney: string;
    withdrawMoney: string;
    StatusMoney: number;
    createdAt: string;
    updatedAt: string;
    reportId: number;
    shopId: number;
    customerId: number;
    addressId: any;
    banksId: any;
}

