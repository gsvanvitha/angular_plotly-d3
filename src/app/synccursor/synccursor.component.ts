import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import * as Plotly from 'plotly.js-dist';
export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37,
}
@Component({
  selector: 'app-synccursor',
  templateUrl: './synccursor.component.html',
  styleUrls: ['./synccursor.component.css'],
})
export class SynccursorComponent implements OnInit {
  public data = [];
  public layout;
  public trace1;
  public trace2;
  public trace3;
  public trace4;
  //public trace5;
  public trace = [];
  public dummyTrace = [];
  public index;
  public moveCursor = false;
  @ViewChild('syncCursorPlot', { static: true }) syncCursorPlot: ElementRef;
  constructor() {}

  ngOnInit(): void {
    this.trace1 = {
      x: [1, 2, 3, 4, 5],
      y: [1, 3, 2, 6, 1],
      mode: 'lines',
      line: {
        width: 1,
      },
      // hoverinfo: 'none',
    };
    this.trace2 = {
      x: [1, 2, 3, 4, 5],
      y: [6, 8, 7, 8, 6],
      mode: 'lines',
      line: {
        width: 1,
      },
      //  hoverinfo: 'none',
    };
    this.trace3 = {
      x: [1, 2, 3, 4, 5],
      y: [11, 13, 12, 13, 11],
      mode: 'lines',
      line: {
        width: 1,
      },
      //  hoverinfo: 'none',
    };
    this.trace4 = {
      x: [1, 2, 3, 4, 5],
      y: [16, 13, 17, 18, 16],
      mode: 'lines',
      line: {
        width: 1,
      },
      // hoverinfo: 'none',
    };
    // this.trace5 = {
    //   x: [1, 2, 3, 4, 5],
    //   y: [12, 16, 19, 18, 16],
    //   mode: 'lines',
    //   line: {
    //     width: 1,
    //   },
    //   // hoverinfo: 'none',
    // };
    this.trace[0] = this.trace1;
    this.trace[1] = this.trace2;
    this.trace[2] = this.trace3;
    this.trace[3] = this.trace4;
    // this.trace[4] = this.trace5;
    for (var i = 0; i < this.trace.length; i++) {
      this.dummyTrace[i] = {
        x: [this.trace[i].x[3]],
        y: [this.trace[i].y[3]],
        mode: 'text',
        type: 'scatter',
        text: ['ϕ'],
        textfont: {
          size: 15,
        },
        hoverinfo: 'none',
        showlegend: false,
      };
    }
    this.index = this.trace1.x.length - 2;
    this.data = this.dataValue();
    this.layout = {
      title: 'Sync Cursor Plot',
      xaxis: {
        range: [0.75, 5.25],
        autorange: false,
      },
      yaxis: {
        range: [0, 20],
        autorange: false,
      },
      //showlegend: false,
      hovermode: 'x unified',
      //dragmode: false,
    };
    Plotly.newPlot(this.syncCursorPlot.nativeElement, this.data, this.layout);
  }

  updateDummyTraces(index) {
    for (var i = 0; i < this.trace.length; i++) {
      this.dummyTrace[i].x = [this.trace[i].x[index]];
      this.dummyTrace[i].y = [this.trace[i].y[index]];
    }
    this.data = this.dataValue();
  }

  dataValue() {
    var data = [];
    for (var i = 0; i < this.trace.length; i++) {
      data[i] = this.trace[i];
    }
    for (var i = 0; i < this.trace.length; i++) {
      data[i + this.trace.length] = this.dummyTrace[i];
    }
    return data;
  }

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.index = this.index + 1;
      if (this.index == this.trace1.x.length) this.index = 0;
      this.updateDummyTraces(this.index);
    }
    if (event.key === 'ArrowLeft') {
      this.index -= 1;
      if (this.index == -1) this.index = this.trace1.x.length - 1;
      this.updateDummyTraces(this.index);
    }
    Plotly.react(this.syncCursorPlot.nativeElement, this.data, this.layout);
    this.divCursor(this.trace.length);
  }

  dragCursor(currentIndex) {
    this.index = currentIndex;
    this.updateDummyTraces(this.index);
    Plotly.react(this.syncCursorPlot.nativeElement, this.data, this.layout);
    this.divCursor(this.trace.length);
  }

  divCursor(numCursors) {
    var NWPoint = document
      .getElementsByClassName('nwdrag')[0]
      .getBoundingClientRect().y;
    var SWPoint = document
      .getElementsByClassName('swdrag')[0]
      .getBoundingClientRect().y;
    for (var i = 0; i < numCursors; i++) {
      var x = document
        .getElementsByClassName('textpoint')
        [i].getBoundingClientRect().x;
      var y = document
        .getElementsByClassName('textpoint')
        [i].getBoundingClientRect().y;
      var el = document.getElementById('boxCursor' + i);
      el.style.position = 'absolute';
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      if (y > SWPoint || y < NWPoint) el.style.display = 'none';
      else el.style.display = 'block';
    }
  }

  ngAfterViewInit() {
    this.divCursor(this.trace.length);
    var click = false;
    this.syncCursorPlot.nativeElement.on('plotly_hover', (data) => {
      // console.log(data);
      if (this.moveCursor == true) {
        if (data.points[this.trace.length] != null) {
          //dummytrace is excluded
        } else {
          this.dragCursor(data.points[0].pointIndex);
        }
      }
    });
    this.syncCursorPlot.nativeElement.on('plotly_relayout', (data) => {
      // create an empty array
      this.divCursor(this.trace.length);
    });

    for (var i = 0; i < this.trace.length; i++) {
      document.getElementById('boxCursor' + i).addEventListener(
        'mousedown',
        (e) => {
          e.preventDefault();
          click = true;
        },
        false
      );
      document
        .getElementById('boxCursor' + i)
        .addEventListener('mouseup', () => {
          if (click == true && this.moveCursor == true) {
            click = false;
            this.moveCursor = false;
          }
        });
    }
    document.getElementById('syncCursorPlot').addEventListener(
      'mousemove',
      (e) => {
        e.preventDefault();
        if (click == true) this.moveCursor = true;
      },
      false
    );
    document
      .getElementById('syncCursorPlot')
      .addEventListener('mouseup', () => {
        if (click == true || this.moveCursor == true) {
          click = false;
          this.moveCursor = false;
        }
      });
    document.addEventListener('pointercancel', () => {
      click = false;
      this.moveCursor = false;
    });
  }
}
