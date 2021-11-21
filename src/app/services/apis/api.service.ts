import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ReqCreateCustomer, ReqCustomer, ResCreateCustomer, ResCustomer } from '../interface/customer.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL = environment.endPointApi;

  constructor(private httpClient: HttpClient) { }

  public getCustomer(body: ReqCustomer): Observable<ResCustomer> {
    return this.httpClient.post<ResCustomer>(`${this.apiURL}/api/customer/getCustomer`, body);
  }
  public createReport(body: ReqCreateCustomer): Observable<ResCreateCustomer> {
    return this.httpClient.post<ResCreateCustomer>(`${this.apiURL}/api/customer/createCustomer`, body);
  }

}