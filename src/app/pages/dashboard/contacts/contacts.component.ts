import { Component, OnDestroy } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'ngx-contacts',
  styleUrls: ['./contacts.component.scss'],
  templateUrl: './contacts.component.html',
})
export class ContactsComponent {

  alarms: any[];
  recent: any[];

  constructor() {}

  async ngOnInit() {
    const result = await axios.get('https://iot-smart-box.herokuapp.com/alarms/active');

    console.log(result.data);

    this.alarms = result.data;
  }
}
