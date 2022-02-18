import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/apis/api.service';
import { ReqGetReport, ReqUpdateReport, ReqUpdateReport2, ResGetReport } from 'src/app/services/interface/report.interface';
import Swal from 'sweetalert2';
declare var $: any;

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss']
})
export class OrderlistComponent implements OnInit {

  ngData = {
    perPages: 10,
    page: 1,
  };

  ngUpdate = {
    id: '',
    orderStatus: ''
  };

  updateReport = {
    id: '',
    orderStatus: '',
    parcelNumber: ''
  };

  DataReport: ResGetReport = null;

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

  constructor(private callApi: ApiService) { }

  ngOnInit(): void {
    this.ShowReport();
  }

  ShowReport() {
    const body: ReqGetReport = {
      perPage: this.ngData.perPages,
      page: this.ngData.page
    };
    this.callApi.getReport(body).subscribe(
      (res) => {
        this.DataReport = res;
      }
    );
  }

  ShowReport1() {
    const body: ReqGetReport = {
      perPage: this.ngData.perPages,
      page: this.ngData.page
    };
    this.callApi.getReport1(body).subscribe(
      (res) => {
        this.DataReport = res;
      }
    );
  }

  ShowReport2() {
    const body: ReqGetReport = {
      perPage: this.ngData.perPages,
      page: this.ngData.page
    };
    this.callApi.getReport2(body).subscribe(
      (res) => {
        this.DataReport = res;
      }
    );
  }

  UpdateReport(id: any , orderStatus: string) {
    const DataUpdateReport = this.DataReport.data.find((a) => a.id === id);
    if (!DataUpdateReport) {
      console.log('1');
      return;
    }
    this.ngUpdate = {
      id: DataUpdateReport.id.toString(),
      orderStatus: orderStatus.toString(),
    };
    const body: ReqUpdateReport = {
      id: Number(this.ngUpdate.id),
      orderStatus: this.ngUpdate.orderStatus
    };
    this.callApi.getUpdateReport(body).subscribe(
      (res) => {
        this.ShowReport();
      }
    );
  }

  UpdateReport2() {
    const DataUpdateReport = this.DataReport.data.find((a) => a.id === Number(this.updateReport.id));
    if (!DataUpdateReport) {
      console.log('1');
      return;
    }
    const body: ReqUpdateReport2 = {
      id: Number(this.updateReport.id),
      orderStatus: this.updateReport.orderStatus,
      parcelNumber: this.updateReport.parcelNumber
    };
    if (!body.parcelNumber) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณากรอกข้อมูลให้ครบ!',
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }
    this.callApi.getUpdateReport2(body).subscribe(
      (res) => {
        this.ShowReport1();
        this.hideModal();
      }
    );
  }

  openModelUpdateReport(id: any, orderStatus: string) {
    this.updateReport = {
      id: id.toString(),
      orderStatus: orderStatus.toString(),
      parcelNumber: ''
    };
    $('#contentupdateReport').modal('show');
    console.log('1');
  }

  hideModal() {
    $('#contentupdateReport').modal('hide');
    this.EmptyData();
  }

  EmptyData(){
    this.updateReport = {
      id: '',
      orderStatus: '',
      parcelNumber: ''
    };
  }

}
