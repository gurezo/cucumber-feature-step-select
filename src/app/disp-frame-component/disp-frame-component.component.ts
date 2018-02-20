import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-disp-frame-component',
  templateUrl: './disp-frame-component.component.html',
  styleUrls: ['./disp-frame-component.component.css']
})
export class DispFrameComponentComponent implements OnInit {

  showDetailsIcon = false;
  showPArea = false;
  constructor() { }

  ngOnInit() {
  }

  onMouseEnter() {
    this.showDetailsIcon = true;
  }

  onMouseLeave() {
    this.showDetailsIcon = false;
  }

  onIconClicked() {
    this.showPArea = true;
    console.log('mouse move & click success!!!!');
    // alert('mouse move & click success!!!!');
  }
}
