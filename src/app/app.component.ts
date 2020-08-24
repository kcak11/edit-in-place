import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data = [];
  dataValid = true;

  constructor() { }

  ngOnInit() {
    this.myValidator = this.myValidator.bind(this);
    for (let i = 0; i < 5; i++) {
      this.data.push({ value: "Value " + (i + 1) });
    }
  }

  getData() {
    return JSON.stringify(this.data, null, 4);
  }

  myValidator(val) {
    this.dataValid = true;
    if (!val) {
      this.dataValid = false;
      return "Value is required.";
    }
    return;
  }

}
