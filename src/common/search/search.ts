import {Component} from '@angular/core';
import {Store} from '@ngrx/store';

import { NavController } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { Renderer2 } from '@angular/core';
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'jh-nav-search',
  templateUrl: 'search.html',
  providers: [  ]
})
export class SearchComponent {
  isActive: boolean = false;
  public query = new Subject();

  constructor(private renderer: Renderer2) {

  }

  onChange(e) {
    this.query.next(e);
  }

  beginSearch() {
    this.isActive = true;
    const searchEl = this.renderer.selectRootElement('#search');
    searchEl.focus();
    /*searchEl.onblur( evt => {
      console.log('blur');
      if (searchEl.value.length < 1) {
        this.clearSearch();
      }
    });*/
  }

  clearSearch() {
    this.renderer.selectRootElement('#search').value = '';
    this.isActive = false;
    this.query.next('');
  }

}
