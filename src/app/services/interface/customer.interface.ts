
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
