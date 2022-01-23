
export interface ReqBanks {
    perPage: number;
    page: number;
}

export interface ResBanks {
    totalItems: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
    data: ResBanksData[];
}

export interface ResBanksData {
    id: number;
    bankName: string;
    firstName: string;
    lastName: string;
    typeBk: string;
    accountNumber: string;
    branch: string;
    createdAt: string;
    updatedAt: string;
    customerId: any;
}


export interface ReqCreateBanks {
    bankName: string;
    firstName: string;
    lastName: string;
    typeBk: string;
    accountNumber: string;
    branch: string;
}

export interface ResCreateBanks {
    id: number;
    bankName: string;
    firstName: string;
    lastName: string;
    typeBk: string;
    accountNumber: string;
    branch: string;
    updatedAt: string;
    createdAt: string;
}

export interface ReqUpdateBanks {
    id: number;
    bankName: string;
    firstName: string;
    lastName: string;
    typeBk: string;
    accountNumber: string;
    branch: string;
}

export interface ResUpdateBanks {
    id: number;
    bankName: string;
    firstName: string;
    lastName: string;
    typeBk: string;
    accountNumber: string;
    branch: string;
    createdAt: string;
    updatedAt: string;
    customerId: any;
}
