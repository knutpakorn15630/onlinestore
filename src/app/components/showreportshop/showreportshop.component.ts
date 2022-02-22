import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apis/api.service';
import { DataIsLogin } from 'src/app/services/interface/customer.interface';
import { ReqUserDataReport, ResUserDataReport } from 'src/app/services/interface/report.interface';
import { LoginService } from 'src/app/services/login.service';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-showreportshop',
  templateUrl: './showreportshop.component.html',
  styleUrls: ['./showreportshop.component.scss']
})
export class ShowreportshopComponent implements OnInit {

  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  DataIsLogin: DataIsLogin = null;

  DataUseReport: ResUserDataReport = null;

  constructor(private callApi: ApiService, private IsLogin: LoginService) {
    this.DataIsLogin = this.IsLogin.getLogin();
  }

  ngOnInit(): void {
    this.ShowDataReport();
  }

  ShowDataReport() {
    const body: ReqUserDataReport = {
      id: this.DataIsLogin.id
    };
    this.callApi.getUserDataReport(body).subscribe(
      (res) => {
        this.DataUseReport = res;
      }
    );
  }
}
