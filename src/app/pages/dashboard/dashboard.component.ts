import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators';
import { SolarData } from '../../@core/data/solar';
import { AbService } from '../../@core/utils/ab.service';
import { MetadataService } from '../../@core/utils/metadata.service';
import axios from 'axios';
import * as _ from 'lodash';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

  private alive = true;
  showCallAction = true;
  commonStatusCardsSet = [];
  sensors = [];

  activeSensors = [];

  solarValue: number = 0;
  interval: string;

  statusCards: string;

  constructor(private themeService: NbThemeService,
    private metaDataService: MetadataService,
    private solarService: SolarData,
    private abService: AbService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCards;
      });

    this.solarService.getSolarData()
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.solarValue = data;
      });
  }

  async ngOnInit() {
    this.metaDataService.updateTitle('Iot Dashboard');
    this.metaDataService.updateKeywords('iot dashboard');

    const result = await axios.get('https://iot-sensor-backend.herokuapp.com/sensors')
    const sensors = result.data;

    this.sensors = sensors.map(sensor => {
      return { ...sensor, status: true }
    })

    this.activeSensors = this.sensors;

    const cards = sensors.map((sensor) => {
      return {
        title: sensor.name,
        iconClass: 'nb-flame-circled',
        type: 'warning',
      }
    })

    this.statusCards = cards;

    this.abService.onAbEvent(AbService.VARIANT_HIDE_CALL_ACTION)
      .pipe(takeWhile(() => this.alive))
      .subscribe(() => this.showCallAction = false);

    setInterval(async () => {
      const humidityResult = await axios.get('https://iot-sensor-backend.herokuapp.com/datalogs/ambient/humidity/' + (this.interval || 1))
      this.solarValue = humidityResult.data.humidityAverage || 0;
      console.log(this.solarValue)
    }, 5000);
  }

  ngOnDestroy() {
    this.alive = false;
  }

  addItem(event: any) {
    const sensorIndex = _.findIndex(this.sensors, sensor => sensor.name === event.title);

    this.sensors[sensorIndex].status = event.status;

    this.activeSensors = this.sensors.filter(sensor => sensor.status === true)

    console.log(this.activeSensors)

  }
}
