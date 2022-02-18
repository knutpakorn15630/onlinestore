import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ResLogin } from 'src/app/services/interface/customer.interface';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  IsColor = 0;
  dataLogin: any;

  constructor(private IsLogin: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.dataLogin = JSON.parse(localStorage.getItem('login'));
    console.log('this storage------>  ', this.dataLogin);
  }

  Logout() {
    this.IsLogin.clearLogin();
    this.router.navigateByUrl('login');
  }

  checkButton(isNumber) {
    // setTimeout(() => {
    //   this.IsColor = 0;
    // }, 300);
    this.IsColor = isNumber;
  }
}
