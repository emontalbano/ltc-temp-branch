import {Component, Input, Output} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DatePicker } from '@ionic-native/date-picker';

@Component({
  selector: 'datetime-picker',
  templateUrl: 'datetime-picker.html',
  providers: [  ]
})
export class DateTimePickerComponent {
  @Output()
  public value: Date;

  public formValue: Subject<any>;

  @Input()
  public label: String;

  constructor(private datePicker: DatePicker) {

  }
  
  public setValue(value: any) {
    this.formValue.next(value);
    this.value = value;
  }

  ngOnInit() {
    this.value = new Date();
  }

  openPicker() {
    this.datePicker.show({
      date: this.value,
      mode: 'datetime',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT
    }).then( 
      date => this.setValue(date), 
      err => console.log('error when getting date: ', err) 
    );
  }
}
