import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import {NavController} from 'ionic-angular';
import { ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SearchComponent } from './';
import { SObjectService } from '../services';

/**
 * Generic Component used to give typical components a standard structure
 */
export class BaseComponent implements OnInit {
  @ViewChild(SearchComponent) search: SearchComponent;
  public items: any;
  constructor(protected sObjects: SObjectService, 
              protected store: Store<any>, 
              protected navCtrl: NavController) { }

  /**
   * Sets the primary sObject type.
   * @param type 
   */
  setType(type: string) {
    this.sObjects.setType(type);
    this.items = this.sObjects.filteredItems;
    this.beforeGet();
    this.sObjects.getAll();
  }
  
  beforeGet() { }

  ngOnInit() {
    if (this.search && this.search.query) {
      this.search.query.subscribe( data => {
        this.sObjects.search(data);
      });
    }
  }

}
