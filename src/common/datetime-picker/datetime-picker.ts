import {Component, Input, Output} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DatePicker } from '@ionic-native/date-picker';
import { EventEmitter } from '@angular/core';
import { createDateObject } from '../utils';


@Component({
  selector: 'datetime-picker',
  templateUrl: 'datetime-picker.html',
  providers: [  ]
})
export class DateTimePickerComponent {
  

  @Input()
  public value:Date;

  @Input()
  public label: string;

  @Input()
  public icon: string;

  @Output()
  public formValue = new EventEmitter<Date>();

  constructor(private datePicker: DatePicker) {

  }

  ngOnInit() {
    this.formValue.emit(this.value);
  }

  openPicker() {
    var val = (this.value) ? createDateObject(this.value) : new Date();
    this.datePicker.show({
      date: val,
      mode: 'datetime',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then( 
      date => { this.value = date; this.formValue.emit(date); }, 
      err => console.log('error when getting date: ', err) 
    );
  }
}
