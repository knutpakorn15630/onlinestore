export interface ReqGetTypeStoke {
  perPage: number;
  page: number;
}

export interface ResGetTypeStoke {
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  data: ResDataTypeStoke[];
}

export interface ResDataTypeStoke {
  id: number;
  typeName: string;
  createdAt: string;
  updatedAt: string;
}


export interface ReqCreateTypeStoke {
  typeName: string;
}

export interface ResCreateTypeStoke {
  id: number;
  typeName: string;
  updatedAt: string;
  createdAt: string;
}

export interface ReqUpdateTypeStoke {
  id: number;
  typeName: string;
}

export interface ResUpdateTypeStoke {
  id: number;
  typeName: string;
  createdAt: string;
  updatedAt: string;
}
