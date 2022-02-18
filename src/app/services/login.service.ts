import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  private profile: DataLogin = null;

  getLogin() {
    const success = localStorage.getItem('login');
    if (!success) {
      return null;
    }
    const json = JSON.parse(success);
    return json;
  }
  setLogin(data: DataLogin) {
    this.profile = data;
    localStorage.setItem('login', JSON.stringify(this.profile));
  }
  clearLogin() {
  localStorage.clear();
  }
}

export interface DataLogin {
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
