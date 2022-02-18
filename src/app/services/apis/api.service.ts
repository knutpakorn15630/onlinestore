import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ReqCreateAddress, ReqCreateCustomer, ReqCustomer, ReqGetAddress, ReqLogin, ReqUpdateAddress, ReqUpdateCustomer,
ResCreateAddress, ResCreateCustomer, ResCustomer, ResGetAddress, ResLogin, ResUpdateAddress, ResUpdateCustomer } from '../interface/customer.interface';
import { Observable } from 'rxjs';
import { ReqBanks, ReqCreateBanks, ReqUpdateBanks, ResBanks, ResCreateBanks, ResUpdateBanks } from '../interface/banks.interface';
import { ReqCreateTypeStoke, ReqGetTypeStoke, ReqUpdateTypeStoke, ResCreateTypeStoke, ResGetTypeStoke, ResUpdateTypeStoke } from '../interface/typestoke.interface';
import { ReqCreateShop, ReqGetUserShop, ReqShop, ReqUpdateShop, ResCreateShop, ResGetUserShop, ResShop, ResUpdateShop, ResUploadShop } from '../interface/adminShop.interface';
// tslint:disable-next-line:max-line-length
import { ReqCreateStock, ReqStock, ReqUpdateStock, ReqUserStock, ResCreateStock, ResStock, ResUpdateStock, ResUploadStock, ResUserStock } from '../interface/stock.interface';
import { ReqBasket, ReqCreateBasket, ReqUpdateBasket, ReqUserBasket, ResBasket, ResCreateBasket, ResUpdateBasket, ResUserBasket } from '../interface/basket.interface';
import { ReqCreateReport, ReqGetReport, ResCreateReport, ResGetReport } from '../interface/report.interface';

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
  public getAddress(body: ReqGetAddress): Observable<ResGetAddress> {
    return this.httpClient.post<ResGetAddress>(`${this.apiURL}/api/customer/getUserAddress`, body);
  }
  public createAddress(body: ReqCreateAddress): Observable<ResCreateAddress> {
    return this.httpClient.post<ResCreateAddress>(`${this.apiURL}/api/customer/createAddress`, body);
  }
  public updateAddress(body: ReqUpdateAddress): Observable<ResUpdateAddress> {
    return this.httpClient.post<ResUpdateAddress>(`${this.apiURL}/api/customer/updateAddress`, body);
  }
  public updateCustomer(body: ReqUpdateCustomer): Observable<ResUpdateCustomer> {
    return this.httpClient.post<ResUpdateCustomer>(`${this.apiURL}/api/customer/updateCustomer`, body);
  }
  public DeleteCustomer(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiURL}/api/customer/deleteCustomer/${id}`);
  }
  public deleteAddress(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiURL}/api/customer/deleteAddress/${id}`);
  }
  public getIsLogin(body: ReqLogin): Observable<ResLogin> {
    return this.httpClient.post<ResLogin>(`${this.apiURL}/api/customer/login`, body);
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
  public getUserShop(body: ReqGetUserShop): Observable<ResGetUserShop> {
    return this.httpClient.post<ResGetUserShop>(`${this.apiURL}/api/shop/getUserShop`, body);
  }
  // public DeleteShop(id: number): Observable<any> {
  //   return this.httpClient.delete<any>(`${this.apiURL}/api/shop/uploadPre/${id}`);
  // }

  public uploadImgPre(file: any, BId: any): Observable<ResUploadShop> {
    const formData: FormData = new FormData();
    formData.append('upload', file, file.name);
    return this.httpClient.post<ResUploadShop>(`${this.apiURL}/api/shop/uploadPre/${BId}`, formData);
  }


  public getStock(body: ReqStock): Observable<ResStock> {
    return this.httpClient.post<ResStock>(`${this.apiURL}/api/stocks/getStock`, body);
  }
  public getUserStock(body: ReqUserStock): Observable<ResUserStock> {
    return this.httpClient.post<ResUserStock>(`${this.apiURL}/api/stocks/getUserStock`, body);
  }
  public updateStock(body: ReqUpdateStock): Observable<ResUpdateStock> {
    return this.httpClient.post<ResUpdateStock>(`${this.apiURL}/api/stocks/updateStocks`, body);
  }
  public DeleteStock(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiURL}/api/stocks/deleteStocks/${id}`);
  }
  public createStock(body: ReqCreateStock): Observable<ResCreateStock> {
    return this.httpClient.post<ResCreateStock>(`${this.apiURL}/api/stocks/createStocks`, body);
  }
  public uploadImgStock(file: any, BId: any): Observable<ResUploadStock> {
    const formData: FormData = new FormData();
    formData.append('uploadMulti', file, file.name);
    return this.httpClient.post<ResUploadStock>(`${this.apiURL}/api/stocks/uploadMulti/${BId}`, formData);
  }


  public getBasket(body: ReqBasket): Observable<ResBasket> {
    return this.httpClient.post<ResBasket>(`${this.apiURL}/api/basket/createBasket`, body);
  }
  public getUserBasket(body: ReqUserBasket): Observable<ResUserBasket> {
    return this.httpClient.post<ResUserBasket>(`${this.apiURL}/api/basket/getUserBasket`, body);
  }
  public CreateBasket(body: ReqCreateBasket): Observable<ResCreateBasket> {
    return this.httpClient.post<ResCreateBasket>(`${this.apiURL}/api/basket/createBasket`, body);
  }
  public UpdateBasket(body: ReqUpdateBasket): Observable<ResUpdateBasket> {
    return this.httpClient.post<ResUpdateBasket>(`${this.apiURL}/api/basket/updateBasket`, body);
  }
  public DeleteBasket(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.apiURL}/api/basket/deleteBasket/${id}`);
  }


  public getReport(body: ReqGetReport): Observable<ResGetReport> {
    return this.httpClient.post<ResGetReport>(`${this.apiURL}/api/report/getReport`, body);
  }
  public CreateReport(body: ReqCreateReport): Observable<ResCreateReport> {
    return this.httpClient.post<ResCreateReport>(`${this.apiURL}/api/report/createReport`, body);
  }
}
