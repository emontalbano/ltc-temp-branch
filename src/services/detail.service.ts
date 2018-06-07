import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {Http} from '@angular/http';
import { Store } from '@ngrx/store';
import { BaseService, SalesforceService, SObjectService } from './index'

/**
 * Detail Service models the master-detail relationship.
 */
@Injectable()
export class DetailService extends SObjectService {
  public parentId: string;
  public parentField: string;
  filteredItems: Observable<any>;
  
  setParentId(id: string, field: string) {
    this.parentId = this.alphanumeric(id);
    this.parentField = this.alphanumeric(field);
    this.store.select(this.type + '_interactivity');
    this.filter(field, id);
  }

  buildWhere() {
    return 'WHERE ' + this.parentField + ' = \'' + this.parentId + '\'';
  }
}