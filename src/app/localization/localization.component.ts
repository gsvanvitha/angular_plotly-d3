import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Plotly from 'plotly.js-dist';
import * as d3 from 'd3';
import locale from 'plotly.js-locales/index';

@Component({
  selector: 'app-localization',
  templateUrl: './localization.component.html',
  styleUrls: ['./localization.component.css'],
})
export class LocalizationComponent implements OnInit {
  languages: string[];
  index: number;
  @ViewChild('plot', { static: true }) ele: ElementRef;
  constructor() {}

  ngOnInit(): void {
    d3.csv(
      'https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv'
    ).then((rows) => {
      // console.log(rows);
      function unpack(rows, key) {
        // console.log(rows);
        return rows.map(function (row) {
          return row[key];
        });
      }
      var trace1 = {
        type: 'scatter',
        mode: 'lines+markers',
        x: unpack(rows, 'Date'),
        y: unpack(rows, 'AAPL.High'),
        line: { color: '#17BECF' },
        hovertemplate: '%{x} series<extra></extra>',
      };

      var trace2 = {
        type: 'scatter',
        mode: 'lines',
        x: unpack(rows, 'Date'),
        y: unpack(rows, 'AAPL.Low'),
        line: { color: '#7F7F7F' },
        hovertemplate: '%{x} series<extra></extra>',
      };

      var data = [trace1, trace2];
      var layout = {
        title: 'Time Series & Selection',
        xaxis: {
          tickformat: '%d %b <br> %_I:%M:%S %p',
          range: ['2015-02-17', '2017-02-16'],
          rangeselector: {
            buttons: [
              {
                count: 1,
                label: '1d',
                step: 'day',
                stepmode: 'backward',
              },
              {
                count: 1,
                label: '1m',
                step: 'month',
                stepmode: 'backward',
              },
              {
                count: 6,
                label: '6m',
                step: 'month',
                stepmode: 'backward',
              },
              {
                count: 9,
                label: '9m',
                step: 'month',
                stepmode: 'backward',
              },
              {
                count: 1,
                label: '1y',
                step: 'year',
                stepmode: 'backward',
              },
              { step: 'all' },
            ],
            pad: { r: 10, t: 10 },
            showactive: true,
            x: 1,
            xanchor: 'top',
            y: 1,
            yanchor: 'bottom',
            font: { color: 'red' },
          },
          rangeslider: { range: ['2015-02-17', '2017-02-16'] }, //, bordercolor: 'blue', borderwidth: 3, bgcolor: 'grey', thickness: 0.75},
          type: 'date',
        },
        yaxis: {
          autorange: true,
          range: [86.8700008333, 138.870004167],
          type: 'linear',
        },
      };

      this.languages = [
        'de',

        'es',

        'fi',

        'fr',

        'it',

        'ja',

        'ko',

        'pt-pt',

        'ru',

        'zh-cn',
        'en-US',
      ];

      this.index = 0;
      Plotly.newPlot(this.ele.nativeElement, data, layout, {
        modeBarButtonsToAdd: [
          'v1hovermode',
          {
            name: 'CustomButton',
            icon: Plotly.Icons.pencil,
            click: () => {
              if (this.index < this.languages.length - 1)
                this.index = this.index + 1;
              else this.index = 0;
              if (this.index > 0) {
                Plotly.register(locale[this.languages[this.index]]);
              }
              Plotly.newPlot(this.ele.nativeElement, data, layout, {
                locale: this.languages[this.index],
              });
            },
          },
        ],
      });
    });
  }
}
