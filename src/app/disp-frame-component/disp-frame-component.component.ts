import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disp-frame-component',
  templateUrl: './disp-frame-component.component.html',
  styleUrls: ['./disp-frame-component.component.css']
})
export class DispFrameComponentComponent implements OnInit {

  showDetailsIcon = true;
  constructor() { }

  ngOnInit() {
  }

  onMouseEnter() {
    this.showDetailsIcon = false;
  }

  onMouseLeave() {
    this.showDetailsIcon = true;
  }
}
