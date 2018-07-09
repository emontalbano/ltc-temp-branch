import {Component, Input} from '@angular/core';

@Component({
  selector: 'jh-toast',
  templateUrl: 'toast.html',
  providers: [  ]
})
export class Toast {
  public message:string = '';
  public isOpen: boolean = false;

  constructor() {
    if (localStorage.getItem('toast') !== null) {
      this.message = localStorage.getItem('toast');
      this.isOpen = true;
      localStorage.removeItem('toast');
      setTimeout( this.close, 6000);
    }
  }

  close() {
    this.isOpen = false;
  }

}