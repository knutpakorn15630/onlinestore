import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ReqCreateCustomer, ReqCustomer, ReqUpdateCustomer, ResCreateCustomer, ResCustomer, ResUpdateCustomer } from '../interface/customer.interface';
import { Observable } from 'rxjs';
import { ReqBanks, ReqCreateBanks, ReqUpdateBanks, ResBanks, ResCreateBanks, ResUpdateBanks } from '../interface/banks.interface';
import { ReqCreateTypeStoke, ReqGetTypeStoke, ReqUpdateTypeStoke, ResCreateTypeStoke, ResGetTypeStoke, ResUpdateTypeStoke } from '../interface/typestoke.interface';
import { ReqCreateShop, ReqShop, ReqUpdateShop, ResCreateShop, ResShop, ResUpdateShop } from '../interface/adminShop.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = environment.endPointApi;

  constructor(private httpClient: HttpClient) { }

  public getCustomer(body: ReqCustomer): Observable<ResCustomer> {
    return this.httpClient.post<ResCustomer>(`${this.apiURL}/api/customer/getCustomer`, body);
  }
  public createCustomer(body: ReqCreateCustomer): Observable<ResCreateCustomer> {
    return this.httpClient.post<ResCreateCustomer>(`${this.apiURL}/api/customer/createCustomer`, body);
  }
  public updateCustomer(body: ReqUpdateCustomer): Observable<ResUpdateCustomer> {
    return this.httpClient.post<ResUpdateCustomer>(`${this.apiURL}/api/customer/updateCustomer`, body);
  }
  public DeleteCustomer(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiURL}/api/customer/deleteCustomer/${id}`);
  }


  public getBanks(body: ReqBanks): Observable<ResBanks> {
    return this.httpClient.post<ResBanks>(`${this.apiURL}/api/banks/getBanks`, body);
  }
  public createBanks(body: ReqCreateBanks): Observable<ResCreateBanks> {
    return this.httpClient.post<ResCreateBanks>(`${this.apiURL}/api/banks/createBanks`, body);
  }
  public DeleteBanks(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiURL}/api/banks/deleteBanks/${id}`);
  }
  public updateBanks(body: ReqUpdateBanks): Observable<ResUpdateBanks> {
    return this.httpClient.post<ResUpdateBanks>(`${this.apiURL}/api/banks/updateBanks`, body);
  }


  public getTypeStoke(body: ReqGetTypeStoke): Observable<ResGetTypeStoke> {
    return this.httpClient.post<ResGetTypeStoke>(`${this.apiURL}/api/typestock/getTypeStocks`, body);
  }
  public createTypeStoke(body: ReqCreateTypeStoke): Observable<ResCreateTypeStoke> {
    return this.httpClient.post<ResCreateTypeStoke>(`${this.apiURL}/api/typestock/createTypeStocks`, body);
  }
  public updateTypeStoke(body: ReqUpdateTypeStoke): Observable<ResUpdateTypeStoke> {
    return this.httpClient.post<ResUpdateTypeStoke>(`${this.apiURL}/api/typestock/updateTypeStocks`, body);
  }
  public DeleteTypeStoke(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiURL}/api/typestock/deleteTypeStocks/${id}`);
  }


  public getShop(body: ReqShop): Observable<ResShop> {
    return this.httpClient.post<ResShop>(`${this.apiURL}/api/shop/getShop`, body);
  }
  public createShop(body: ReqCreateShop): Observable<ResCreateShop> {
    return this.httpClient.post<ResCreateShop>(`${this.apiURL}/api/shop/createShop`, body);
  }
  public updateShop(body: ReqUpdateShop): Observable<ResUpdateShop> {
    return this.httpClient.post<ResUpdateShop>(`${this.apiURL}/api/shop/updateShop`, body);
  }
  public DeleteShop(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiURL}/api/shop/deleteShop/${id}`);
  }

}
