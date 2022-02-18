
export interface ReqCustomer {
    perPage: number;
    page: number;
}

export interface ResCustomer {
    data: getCustomer[];
}

// tslint:disable-next-line:class-name
export interface getCustomer {
    id: number;
    userName: string;
    passWord: string;
    firstName: string;
    lastName: string;
    gmail: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
}

export interface ReqCreateCustomer {
    userName: string;
    passWord: string;
    firstName: string;
    lastName: string;
    gmail: string;
    phoneNumber: string;
    status: number;
}

export interface ResCreateCustomer {
    id: number;
    userName: string;
    passWord: string;
    firstName: string;
    lastName: string;
    gmail: string;
    phoneNumber: string;
    updatedAt: string;
    createdAt: string;
}

export interface ReqGetAddress {
    id: number;
}

export interface ResGetAddress {
    data: DataReqGetAddress[];
}

export interface DataReqGetAddress {
    id: number;
    addressName: string;
    createdAt: string;
    updatedAt: string;
    customerId: number;
}

export interface ReqCreateAddress {
    addressName: string;
    customerId: number;
}

export interface ResCreateAddress {
    id: number;
    addressName: string;
    customerId: number;
    updatedAt: string;
    createdAt: string;
}

export interface ReqUpdateAddress {
    id: number;
    addressName: string;
}

export interface ResUpdateAddress {
    id: number;
    addressName: string;
    createdAt: string;
    updatedAt: string;
    customerId: number;
}

export interface ReqUpdateCustomer {
    id: number;
    userName: string;
    passWord: string;
    firstName: string;
    lastName: string;
    gmail: string;
    phoneNumber: string;
}

export interface ResUpdateCustomer {
    id: number;
    userName: string;
    passWord: string;
    firstName: string;
    lastName: string;
    gmail: string;
    phoneNumber: string;
    createdAt: string;
    updatedAt: string;
}

export interface ReqLogin {
    userName: string;
    password: string;
}

export interface ResLogin {
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

export interface DataIsLogin {
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


