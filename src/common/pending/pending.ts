import {Component} from '@angular/core';
import {Store} from '@ngrx/store';
import { Subject } from 'rxjs/Subject';


/**
 * Generic component used to handle various types of pending 'getAll' requests.
 */
@Component({
  selector: 'jh-nav-pending',
  templateUrl: 'pending.html',
  providers: [  ]
})
export class PendingComponent {
  public meta: any;
  constructor(private store: Store<any>) {
    this.meta = this.store.select('meta');
  }
}
