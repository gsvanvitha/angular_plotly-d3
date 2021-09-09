import { Component, ElementRef, OnInit, ViewChild, ɵgetDebugNode__POST_R3__ } from '@angular/core';
import * as Plotly from 'plotly.js-dist';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
    var xData = ['Product<br>Revenue', 'Services<br>Revenue',
'Total<br>Revenue', 'Fixed<br>Costs',
'Variable<br>Costs', 'Total<br>Costs', 'Total'
];

var yData = [400, 660, 660, 590, 400, 400, 340];

var textList = ['$430K', '$260K', '$690K', '$-120K', '$-200K', '$-320K', '$370K'];

//Base

var trace1 = {
x: xData,
y: [0, 430, 0, 570, 370, 370, 0],
marker: {
 color: 'rgba(1,1,1,0.0)'
},
type: 'bar'
};

//Revenue

var trace2 = {
x: xData,
y: [430, 260, 690, 0, 0, 0, 0],
type: 'bar',
marker: {
  color: 'rgba(55,128,191,0.7)',
  line: {
    color: 'rgba(55,128,191,1.0)',
    width: 2
  }
}
};

//Cost

var trace3 = {
x: xData,
y: [0, 0, 0, 120, 200, 320, 0],
type: 'bar',
marker: {
  color: 'rgba(219, 64, 82, 0.7)',
  line: {
    color: 'rgba(219, 64, 82, 1.0)',
    width: 2
  }
}
};

//Profit

var trace4 = {
x: xData,
//y: [100, 100, 100, 100, 100, 100, 370],
y: [0,0,0,0,0,0,370],
type: 'bar',
marker: {
  color: 'rgba(50,171, 96, 0.7)',
  line: {
    color: 'rgba(50,171,96,1.0)',
    width: 2
  }
}
};

var data = [trace1, trace2, trace3, trace4];

var layout = {
title: 'Annual Profit 2015',
barmode: 'stack',
paper_bgcolor: 'rgba(245,246,249,1)',
plot_bgcolor: 'rgba(245,246,249,1)',
width: 600,
height: 600,
showlegend: false,
hovermode: 'y',
hoverlabel:{
  angle: 70
},
annotations: [],
xaxis: {
  tickangle: -45
},
yaxis: {
  zeroline: false,
  gridwidth: 2
},
bargap :0.05
};

for ( var i = 0 ; i < 7 ; i++ ) {
var result = {
  x: xData[i],
  y: yData[i],
  text: textList[i],
  font: {
    family: 'Arial',
    size: 14,
    color: 'rgba(245,246,249,1)'
  },
  showarrow: false
};
layout.annotations.push(result);
};

Plotly.newPlot('plotLayout', data, layout); 
// var axisIds = require('../../plots/cartesian/axis_ids');
// var astr = 'dragmode';
//     var val = 'zoom' || true;
//    // var fullLayout = gd._fullLayout;
//     var aobj = {};
//     var axList = axisIds.list(gd, null, true);
//     var allSpikesEnabled = 'on';

//     var ax, i=0;
// $('.hideshow button').click(function(){
//   var mag = (val === 'in') ? 0.5 : 2;
//         var r0 = (1 + mag) / 2;
//         var r1 = (1 - mag) / 2;
//         var axName;

//         for(i = 0; i < axList.length; i++) {
//             ax = axList[i];

//             if(!ax.fixedrange) {
//                 axName = ax._name;
//                 if(val === 'auto') aobj[axName + '.autorange'] = true;
//                 else if(val === 'reset') {
//                     if(ax._rangeInitial === undefined) {
//                         aobj[axName + '.autorange'] = true;
//                     } else {
//                         var rangeInitial = ax._rangeInitial.slice();
//                         aobj[axName + '.range[0]'] = rangeInitial[0];
//                         aobj[axName + '.range[1]'] = rangeInitial[1];
//                     }
//                     if(ax._showSpikeInitial !== undefined) {
//                         aobj[axName + '.showspikes'] = ax._showSpikeInitial;
//                         if(allSpikesEnabled === 'on' && !ax._showSpikeInitial) {
//                             allSpikesEnabled = 'off';
//                         }
//                     }
//                 } else {
//                     var rangeNow = [
//                         ax.r2l(ax.range[0]),
//                         ax.r2l(ax.range[1]),
//                     ];

//                     var rangeNew = [
//                         r0 * rangeNow[0] + r1 * rangeNow[1],
//                         r0 * rangeNow[1] + r1 * rangeNow[0]
//                     ];

//                     aobj[axName + '.range[0]'] = ax.l2r(rangeNew[0]);
//                     aobj[axName + '.range[1]'] = ax.l2r(rangeNew[1]);
//                 }
//             }
// }
// });
   }

}
