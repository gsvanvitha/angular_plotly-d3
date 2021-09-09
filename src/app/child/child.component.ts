import { Component, ElementRef, OnInit, ViewChild, ɵgetDebugNode__POST_R3__ } from '@angular/core';
import * as Plotly from 'plotly.js-dist';
import * as PlotlyJS from 'plotly.js/dist/plotly.js';
import * as d3 from 'd3';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})

export class ChildComponent implements OnInit {

  @ViewChild('plot',{static:true}) ele:ElementRef;
  @ViewChild('plot1',{static:true}) myPlot1:ElementRef;
  
  constructor() { }
  ngAfterContentInit(){
    var subject = ['Moe','Lay','Curly','Moe','Lay','Curly','Moe','Lay','Curly','Moe','Lay','Curly']
    var score = [1,6,2,8,2,9,4,5,1,5,2,8]
    
    var data2 = [{
      type: 'scatter',
      x: subject,
      y: score,
      mode: 'markers+lines+text',
      textposition: 'bottom',
      textfont: {
        family: 'sans serif',
        size: 10,
        color: 'grey'
      },
      transforms: [{
       type: 'aggregate',
        groups: subject,
        aggregations: [
          {target: 'y', func: 'max', enabled: true},
        ]
      }],
      text:'aggregate-value-max',
      hovermode: 'closest+y',
     
     //  hovertemplate:'<ng-template> Hey</ng-template>',
       hovertemplate:'<p><i>Hey</i></p>',
    
     
      line : {dash:'dot', width:1},
    }]
    var layout3={
      yaxis: {
        range: [0,10],
        linecolor: 'grey',
        linewidth : '2',
        tickcolor: 'grey',
        tickwidth: '2',
        tickfont:{
          color: 'grey'
        },
        gridcolor: '#9DC183',
        gridwidth: '12'
      },
      xaxis: {
       // showgrid: false,
        gridcolor: 'grey',
        gridwidth: '3'
      },
      hoverdistance: 400
    }
    
    Plotly.newPlot('myDiv1', data2, layout3);
    console.log('div4');
    var myPlot2 = document.getElementById('myDiv4'),
    hoverInfo = document.getElementById('hoverinfo'),
    N = 16,
    x = d3.range(N),
    y1 = d3.range(N).map( d3.randomNormal() ),
    y2 = d3.range(N).map( d3.randomNormal() ),
    data = [ { x:x, y:y1, type:'scatter', name:'Trial 1',
        mode:'markers', marker:{size:16} },
        { x:x, y:y2, type:'scatter', name:'Trial 2',
        mode:'markers', marker:{size:16} } ];
    var layout = {
      hoverlabel: {
        angle: 180 // or [10, 90, 45] one item per-pt
      },
        hovermode:'x',
        title:'Hover on Points',
       
       
     };

Plotly.newPlot('myDiv4', data, layout);
this.myPlot1.nativeElement = myPlot2;
this.myPlot1.nativeElement.on('plotly_hover', function(data){
    var infotext = data.points.map(function(d){
      return (d.data.name+': x= '+d.x+', y= '+d.y.toPrecision(3));
    });

    hoverInfo.innerHTML = infotext.join('<br/>');
})
 .on('plotly_unhover', function(data){
    hoverInfo.innerHTML = '';
});
    
  }
  ngOnInit(): void {
    //basic plot
   // Plotly.newPlot(this.ele.nativeElement,[{x:[1,2,3],y:[1,2,3], type: 'scatter'}]);
   //range slider and selector
     d3.csv("https://raw.githubusercontent.com/plotly/datasets/master/finance-charts-apple.csv").then( rows=>{
      console.log(rows);
      function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });}
    var trace1 = {
      type: "scatter",
      mode: "lines",
      name: 'AAPL High',
      x: unpack(rows, 'Date'),
      y: unpack(rows, 'AAPL.High'),
      line: {color: '#17BECF'}
    }

    var trace2 = {
      type: "scatter",
      mode: "lines",
      name: 'AAPL Low',
      x: unpack(rows, 'Date'),
      y: unpack(rows, 'AAPL.Low'),
      line: {color: '#7F7F7F'}
    }

    var data = [trace1,trace2];
    var layout = {
      title: 'Time Series & Selection',
      xaxis: {
        autorange: true,
        range: ['2015-02-17', '2017-02-16'],
        rangeselector: {buttons: [
          {
            count: 1,
            label: '1d',
            step: 'day',
            stepmode: 'backward'
          },
          {
            count: 1,
            label: '1m',
            step: 'month',
            stepmode: 'backward'
          },
          {
            count: 6,
            label: '6m',
            step: 'month',
            stepmode: 'backward'
          },
          {
            count: 9,
            label: '9m',
            step: 'month',
            stepmode: 'backward'
          },{
            count: 1,
            label: '1y',
            step: 'year',
            stepmode: 'backward'
          },
          {step: 'all'}
        ],
      direction: 'down',
      pad: {'r': 10, 't': 10},
      showactive: true,
      type: 'dropdown',
      x: 1,
      xanchor: 'top',
      y: 1,
      yanchor: 'bottom',
      font: {color: 'red'}},
        rangeslider: {range: ['2015-02-17', '2017-02-16']},
        type: 'date'
      },
      yaxis: {
        autorange: true,
        range: [86.8700008333, 138.870004167],
        type: 'linear'
      }
    };

    Plotly.newPlot(this.ele.nativeElement, data, layout);

    }); 

    var valuesy1=[1, 6, 3, 6, 1];
    var valuesx1 = [1, 2, 3, 4, 5];
    var color1 =[,,,,];
    var color2 =[,,,,];
    var valuesy2=[4, 1, 7, 1, 4];
    var valuesx2 = [1.5, 2.5, 3.5, 4.5, 5.5];

    //hover on markers
    var trace1 = {
      x: valuesx1,
      y: valuesy1,
      mode: 'lines+markers+text',
      type: 'scatter',
      name: 'Team A',
      text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
      textposition: 'top center',
      textfont: {
        family:  'Raleway, sans-serif'
      },
      marker: { size: 12, symbol:'pentagon',color: color1 },
      line : {dash:'dot', width:1, color: "green"},
      yaxis: 'y2',
    };
    
    var trace2 = {
      x: valuesx2,
      y: valuesy2,
      mode: 'markers+text',
      type: 'scatter',
      name: 'Team B',
      text: ['B-1', 'B-2', 'B-3', 'B-4', 'B-5'],
      textfont : {
        family:'Times New Roman'
      },
      textposition: 'bottom center',
      marker: { size: 12,
        color: color2 },
     
    };
    
    var data = [ trace1, trace2];

    //mutliple y-axis 
    
    var layout = {
      xaxis: {
        range: [ 0.75, 5.25 ],
        zeroline: false
      },
      yaxis: {
        range: [0, 8],
        linecolor: 'blue',
        linewidth : '2',
        tickcolor: 'blue',
        tickwidth: '2',
        tickfont:{
          color: 'blue'
        },
        title: 'y-axis1'
      },
      yaxis2 : {
        range: [1,7],
        side: 'right',
        overlaying: 'y',
        linecolor: 'orange',
        linewidth : '2',
        tickcolor: 'orange',
        tickwidth: '2',
        tickfont:{
          color: 'orange'
        },
        title: 'y-axis2'
      },
      legend: {
        y: 0.5,
        yref: 'y',
        font: {
          family: 'Arial, sans-serif',
          size: 15,
          color: 'brown',
        }
      },
      title:'Data Labels on the Plot',
   
      shapes: [
        {
            type: 'line',
            xref: 'paper',
            x0: 0,
            y0: 5.0,
            x1: 1,
            y1: 4.9,
            line:{
                color: 'purple',
                width: 1,
               // dash:'dot'
            }
        }
        ]
    };
    Plotly.newPlot('myDiv', data, layout,  {staticPlot:true,editable:false, scrollZoom:true,displayModeBar:false, responsive:true}  );

var interval = setTimeout(function() {
  console.log('entered');
  var time = new Date();
 // var color = "red";
  var i=0;
  for(i=0;i<valuesy1.length;i+=1){
    console.log(valuesy1[i]+" "+valuesy2[i]);
	if(valuesy1[i] >= 5){
		color1[i] = "red";
	}
  else{
    color1[i]="blue";
  }
  if(valuesy2[i]>=5)color2[i]="red";
  else color2[i]="blue";
}
  var update = {
  'marker.color':[[color1,color2]]
  }
  
  Plotly.extendTraces('myDiv', update, [0],10)
},2000);


    //aggregate functions


    //annotations
    var trace3 = {
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      y: [0, 1, 3, 2, 4, 3, 4, 6, 5],
      type: 'scatter'
    };
    var trace4 = {
      x: [0, 1, 2, 3, 4, 5, 6, 7, 8],
      y: [0, 4, 5, 1, 2, 2, 3, 4, 2],
      type: 'scatter'
    };
    var data1 = [trace3, trace4];
    var layout1 = {
      showlegend: false,
      annotations: [
        {
          x: 5,
          y: 5,
          xref: 'x',
          yref: 'y',
          text: '(5,5)',
          showarrow: true,

          font: {
            family: 'Courier New, monospace',
            size: 16,
            color: '#ffffff'
          },
          align: 'center',
          arrowhead: 10,
          arrowsize: 1,
          arrowwidth: 2,
          arrowcolor: '#636363',
          ax: 20,
          ay: -30,
          bordercolor: '#c7c7c7',
          borderwidth: 2,
          borderpad: 4,
          bgcolor: '#ff7f0e',
          opacity: 0.8
        },
        {
          x: 1,
          y: 4,
          xref: 'x',
          yref: 'y',
          text: '(1,4)',
          showarrow: true,

          font: {
            family: 'Courier New, monospace',
            size: 16,
            color: '#ffffff'
          },
          align: 'center',
          arrowhead: 7,
          arrowsize: 1,
          arrowwidth: 2,
          arrowcolor: '#636363',
          ax: 20,
          ay: -50,
          bordercolor: '#c7c7c7',
          borderwidth: 2,
          borderpad: 4,
          bgcolor: '#ff7f0e',
          opacity: 0.8
        }
      ],
      hovermode: 'y+closest'
    };
    Plotly.newPlot('myPlot', data1, layout1);
 
  }


}
