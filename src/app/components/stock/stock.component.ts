import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

  random() {
    const random1 = Math.floor(Math.random() * 900000) + 100000;
    console.log( 'this. is a number', random1);
  }

}
