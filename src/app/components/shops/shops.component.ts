import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataIsLogin } from 'src/app/services/interface/customer.interface';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.scss']
})
export class ShopsComponent implements OnInit {

  constructor(private IsLogin: LoginService, private router: Router) {
    this.DataIsLogin = this.IsLogin.getLogin();
  }

  DataIsLogin: DataIsLogin = null;

  ngOnInit(): void {
  }

  Logout() {
    this.IsLogin.clearLogin();
    this.router.navigateByUrl('login');
  }

}
