import { Component, Input, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import axios from 'axios';
import * as BluePromise from 'bluebird';
import * as _ from 'lodash';

@Component({
  selector: 'ngx-chartjs-multiple-xaxis',
  template: `
  <span *ngIf='data !== []'>
    <chart type="line" [data]="data" [options]="options"></chart>
  </span>
  `,
  styleUrls: ['./electricity-chart.component.scss'],
})
export class ChartjsMultipleXaxisComponent implements OnDestroy {
  data: any[];
  options: any;
  themeSubscription: any;

  @Input() sensors: any[]
  @Input() interval: any[]

  constructor(private theme: NbThemeService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const chartjs: any = config.variables.chartjs;



      this.options = {
        responsive: true,
        maintainAspectRatio: true,
        legend: {
          position: 'bottom',
          labels: {
            fontColor: chartjs.textColor,
          },
        },
        hover: {
          mode: 'index',
        },
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Hour',
              },
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'C',
              },
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
      };
    });
  }

  // async ngOnInit() {
  //   const dataResult = []

  //   await BluePromise.map(this.sensors, async (sensor) => {
  //     const result = await axios.get('https://iot-sensor-backend.herokuapp.com/datalogs/'+sensor._id+'/lasthour');
  //     const data = result.data;

  //     const labels = data.map((point) => {
  //       const date = new Date(point.timestamp * 1000);
  //       return date.getHours() + ':' + date.getMinutes();
  //     })

  //     const point = data.map((point) => point.value)

  //     dataResult.push ( {
  //       labels: labels,
  //       datasets: [{
  //         label: 'sensor data',
  //         data: point,
  //         fill: false,
  //         borderColor: 'blue',
  //         backgroundColor: 'white',
  //         borderDash: [5, 5],
  //         pointRadius: 8,
  //         pointHoverRadius: 10,
  //       }],
  //     })

  //   })

  //   this.data = dataResult;

  //   console.log(this.data)
  // }

  async ngOnChanges() {
    const dataResult = []

    await BluePromise.map(this.sensors, async (sensor) => {
      const result = await axios.get('https://iot-sensor-backend.herokuapp.com/datalogs/' + sensor._id + '/' + this.interval);
      const data = result.data;

      const labels = data.map((point) => {
        const date = new Date(point.timestamp * 1000);
        const minutes = date.getMinutes()

        return date.getHours() + ':' + (minutes < 10 ? '0' + minutes : minutes);
      })

      const point = data.map((point) => point.value)

      const mergedValues = data.map((point) => {
        const date = new Date(point.timestamp * 1000);
        const minutes = date.getMinutes()
        return { time: date.getHours() + ':' + (minutes < 10 ? '0' + minutes : minutes), value: point.value };
      })

      dataResult.push({
        labels: labels || [],
        datasets: {
          label: sensor.name,
          data: point,
          fill: false,
          borderColor: sensor.color,
          backgroundColor: 'white',
          borderDash: [5, 5],
          pointRadius: 8,
          pointHoverRadius: 10,
        },
        mergedValues
      })

    })

    let mergedLabels = dataResult.reduce((acc, data) => {
      if (!_.isEmpty(data.labels)) {
        acc = _.concat(acc, data.labels);
      }
      return acc;
    }, [])

    mergedLabels = _.sortBy(_.uniq(mergedLabels),)


    const reducedData = dataResult.reduce((acc, data) => {
      acc.labels = mergedLabels;

      const normalizedData = _.map(mergedLabels, (point) => {
        const pointExist = _.find(data.mergedValues, { time: point })

        if (pointExist) {
          return pointExist.value
        }

        return null;
      })

      data.datasets.data = normalizedData

      acc.datasets.push(data.datasets)
      return acc

    }, { labels: [], datasets: [] })

    console.log(reducedData)

    this.data = reducedData;
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
