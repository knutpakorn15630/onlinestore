import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  IsColor = 0;

  constructor() { }

  ngOnInit(): void {
  }

  checkButton(isNumber){
    // setTimeout(() => {
    //   this.IsColor = 0;
    // }, 300);
    this.IsColor = isNumber;
  }
}
