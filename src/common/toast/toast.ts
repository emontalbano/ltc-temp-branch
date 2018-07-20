import {Component, Input} from '@angular/core';

@Component({
  selector: 'jh-toast',
  templateUrl: 'toast.html',
  providers: [  ]
})
export class Toast {
  public message:string = '';
  public isOpen: boolean = false;
  public interval: any;

  constructor() {
    if (localStorage.getItem('toast') !== null) {
      this.message = localStorage.getItem('toast');
      this.isOpen = true;
      localStorage.removeItem('toast');
      setTimeout( () => {
        this.close();
      }, 6000);
    } else {
      this.interval = setInterval( () => {
        if (localStorage.getItem('toast') !== null) {
          clearInterval(this.interval);
          this.message = localStorage.getItem('toast');
          this.isOpen = true;
          localStorage.removeItem('toast');
          setTimeout( () => {
            this.close();
          }, 6000);
        }
      });
    }
  }

  close() {
    this.isOpen = false;
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

}