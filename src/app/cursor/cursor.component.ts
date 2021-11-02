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
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.css'],
})
export class CursorComponent implements OnInit {
  public xvalues;
  public yvalues;
  public originalTrace;
  public originalTrace1;
  public dummyTrace1;
  public dummyTrace2;
  public data;
  public layout;
  public curxcursor1;
  public curycursor1;
  public curxcursor2;
  public curycursor2;
  public activecursor1 = false;
  public activecursor2 = false;
  public clicked;
  public clickx;
  public clicky;
  @ViewChild('cursorPlot', { static: true }) cursorPlot: ElementRef;
  public plot;
  public dragCursor1;
  public dragCursor2;
  constructor() {}

  ngOnInit(): void {
    this.xvalues = [
      '01-01-2021',
      '02-01-2021',
      '03-01-2021',
      '04-01-2021',
      '05-01-2021',
      '06-01-2021',
      '07-01-2021',
      '08-01-2021',
      '09-01-2021',
    ];
    this.yvalues = [10, 20, 30, 20, 10, 70, 90, 80, 30];

    this.originalTrace = {
      x: this.xvalues,
      y: this.yvalues,
      mode: 'lines+markers',
      type: 'scatter',
      marker: { size: 8, symbol: 'circle', color: 'green', opacity: '0.3' },
      line: { dash: 'solid', width: 1, color: 'green', opacity: '0.3' },
    };

    this.dummyTrace1 = {
      x: [],
      y: [],
      mode: 'text',
      type: 'scatter',
      text: ['ϕ'],
      textfont: {
        size: 15,
        color: 'red',
      },
    };

    this.dummyTrace2 = {
      x: [],
      y: [],
      mode: 'text',
      type: 'scatter',
      text: ['⌖'],
      textfont: {
        size: 25,
        color: 'red',
      },
    };

    this.data = [this.originalTrace];
    this.layout = {
      xaxis: {
        linecolor: 'grey',
        linewidth: 2,
        title: 'x-axis',
        range: [-1, 10],
        zeroline: false,
      },
      yaxis: {
        linecolor: 'grey',
        linewidth: 2,
        title: 'y-axis',
        range: [-10, 100],
        zeroline: false,
      },
      title: 'Cursors Plot',
      //dragmode: false,
      hovermode: 'closest',
      hoverdistance: 50000,
    };

    this.curxcursor1 = this.xvalues.length - 2;
    this.curycursor1 = this.yvalues.length - 2;

    this.curxcursor2 = 1;
    this.curycursor2 = 1;
    // this.originalTrace1 = {
    //   x: ['01-01-2021','02-01-2021','03-01-2021','04-01-2021'],
    //   y:  [30,80,90,70],
    //   text : '+',
    //   mode: 'lines+markers+text',
    //   type: 'scatter',
    //   marker: { size: 8, symbol:'circle',color: 'green', opacity:'0.1' },
    //   line : {dash:'solid', width:1, color: 'green', opacity:'0.3'}
    // };
    // this.data = [this.originalTrace,this.originalTrace1]
    this.plot = Plotly.newPlot(
      this.cursorPlot.nativeElement,
      this.data,
      this.layout
    );
    //console.log(this.plot);
  }

  currentTraceValues() {
    if (this.activecursor1) {
      this.dummyTrace1.x = [this.xvalues[this.curxcursor1]];
      this.dummyTrace1.y = [this.yvalues[this.curycursor1]];
    }
    if (this.activecursor2) {
      this.dummyTrace2.x = [this.xvalues[this.curxcursor2]];
      this.dummyTrace2.y = [this.yvalues[this.curycursor2]];
    }
  }

  addCursor1() {
    this.dummyTrace1.x = [this.xvalues[this.curxcursor1]];
    this.dummyTrace1.y = [this.yvalues[this.curycursor1]];
    this.activecursor1 = true;
    this.checkActive();
    Plotly.react(this.cursorPlot.nativeElement, this.data, this.layout);
    this.divCursor1(
      document.getElementsByTagName('text')[0].getBoundingClientRect().x,
      document.getElementsByTagName('text')[0].getBoundingClientRect().y
    );
  }

  addCursor2() {
    this.dummyTrace2.x = [this.xvalues[this.curxcursor2]];
    this.dummyTrace2.y = [this.yvalues[this.curycursor2]];
    this.activecursor2 = true;
    this.checkActive();
    Plotly.react(this.cursorPlot.nativeElement, this.data, this.layout);
    this.divCursor2(
      document.getElementsByTagName('text')[1].getBoundingClientRect().x,
      document.getElementsByTagName('text')[1].getBoundingClientRect().y
    );
  }

  cursorLeft() {
    if (this.activecursor1) {
      this.curxcursor1--;
      this.curycursor1--;
    }
    if (this.curxcursor1 == -1) this.curxcursor1 = this.xvalues.length - 1;
    if (this.curycursor1 == -1) this.curycursor1 = this.yvalues.length - 1;
    if (this.activecursor2) {
      this.curxcursor2--;
      this.curycursor2--;
    }
    if (this.curxcursor2 == -1) this.curxcursor2 = this.xvalues.length - 1;
    if (this.curycursor2 == -1) this.curycursor2 = this.yvalues.length - 1;
    this.currentTraceValues();
    Plotly.react(this.cursorPlot.nativeElement, this.data, this.layout);
    if (this.activecursor1)
      this.divCursor1(
        document.getElementsByTagName('text')[0].getBoundingClientRect().x,
        document.getElementsByTagName('text')[0].getBoundingClientRect().y
      );
    if (this.activecursor2)
      this.divCursor2(
        document.getElementsByTagName('text')[1].getBoundingClientRect().x,
        document.getElementsByTagName('text')[1].getBoundingClientRect().y
      );
  }

  cursorRight() {
    if (this.activecursor1) {
      this.curxcursor1++;
      this.curycursor1++;
    }
    if (this.curxcursor1 == this.xvalues.length) this.curxcursor1 = 0;
    if (this.curycursor1 == this.yvalues.length) this.curycursor1 = 0;
    if (this.activecursor2) {
      this.curxcursor2++;
      this.curycursor2++;
    }
    if (this.curxcursor2 == this.xvalues.length) this.curxcursor2 = 0;
    if (this.curycursor2 == this.yvalues.length) this.curycursor2 = 0;
    this.currentTraceValues();
    Plotly.react(this.cursorPlot.nativeElement, this.data, this.layout);
    if (this.activecursor1) {
      this.divCursor1(
        document.getElementsByTagName('text')[0].getBoundingClientRect().x,
        document.getElementsByTagName('text')[0].getBoundingClientRect().y
      );
    }
    if (this.activecursor2) {
      this.divCursor2(
        document.getElementsByTagName('text')[1].getBoundingClientRect().x,
        document.getElementsByTagName('text')[1].getBoundingClientRect().y
      );
    }
  }

  cursorStatus(option) {
    if (option == 'both') {
      this.activecursor1 = true;
      this.activecursor2 = true;
      //this.addCursor1();
      //this.addCursor2();
    } else if (option == '1') {
      this.activecursor1 = true;
      this.activecursor2 = false;
      //this.addCursor1();
    } else if (option == '2') {
      this.activecursor1 = false;
      this.activecursor2 = true;
      //this.addCursor2();
    } else if (option == 'none') {
      this.activecursor1 = false;
      this.activecursor2 = false;
    }
    // this.currentTraceValues();
    // this.cursorLeft();
    // this.cursorRight();
    this.checkActive();
    //console.log(this.activecursor1 + ' ' + this.activecursor2);
    Plotly.react(this.cursorPlot.nativeElement, this.data, this.layout);
  }

  checkActive() {
    this.data = [this.originalTrace, this.dummyTrace1, this.dummyTrace2];
    // if(this.activecursor1==true && this.activecursor2==true) this.data = [this.originalTrace,this.dummyTrace1,this.dummyTrace2]
    // if(this.activecursor1==true && this.activecursor2==false) this.data = [this.originalTrace,this.dummyTrace1]
    // if(this.activecursor1==false && this.activecursor2==true) this.data = [this.originalTrace,this.dummyTrace2]
    // if(this.activecursor1==false && this.activecursor2==false) this.data = [this.originalTrace]
    // console.log('active')
    // console.log(this.data)
  }

  dragCursor(x, y, screenx, screeny, currentIndex) {
    // console.log(currentIndex);
    if (this.dragCursor1) {
      this.dummyTrace1.x = [x];
      this.dummyTrace1.y = [y];
      this.curxcursor1 = currentIndex;
      this.curycursor1 = currentIndex;
    }
    if (this.dragCursor2) {
      this.dummyTrace2.x = [x];
      this.dummyTrace2.y = [y];
      this.curxcursor2 = currentIndex;
      this.curycursor2 = currentIndex;
    }
    Plotly.react(this.cursorPlot.nativeElement, this.data, this.layout);
    // console.log(screenx, screeny);
    if (this.dragCursor1) this.divCursor1(screenx, screeny);
    if (this.dragCursor2) this.divCursor2(screenx, screeny);
  }
  divCursor1(screenx, screeny) {
    this.dragCursor2 = false;
    var x = screenx;
    var y = screeny;

    var el = document.getElementById('boxCursor1');
    el.style.position = 'absolute';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    console.log('ENTERED');
  }
  divCursor2(screenx, screeny) {
    this.dragCursor1 = false;
    var x = screenx;
    var y = screeny;
    // console.log('Screen position ');
    var el = document.getElementById('boxCursor2');
    el.style.position = 'absolute';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    //console.log('ENTERED');
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') {
      this.cursorRight();
    }
    if (event.key === 'ArrowLeft') {
      this.cursorLeft();
    }
  }

  divClicked(data) {
    console.log('div clicked');
    console.log(data);
  }

  ngAfterViewInit() {
    //   console.log('INIT ' + this.dummyTrace1.x);
    this.cursorPlot.nativeElement.on('plotly_click', (data) => {
      this.clicked = true;
      data.points.map((d) => {
        this.clickx = d.x;
        this.clicky = d.y;
      });
    });
    this.cursorPlot.nativeElement.on('plotly_relayout', (data) => {
      console.log('relayout');
      console.log(data);
    });

    this.cursorPlot.nativeElement.on('plotly_hover', (data) => {
      //  console.log('hover');
      data.points.map((d) => {
        if (this.dragCursor1 == true || this.dragCursor2 == true) {
          // console.log(d.pointIndex);
          // this.dragCursor(d.x,d.y,document.getElementsByTagName('text')[0].getBoundingClientRect().x,document.getElementsByTagName('text')[0].getBoundingClientRect().y)
          this.dragCursor(d.x, d.y, d.bbox.x0, d.bbox.y0, d.pointIndex);
        }
      });
    });
    this.dragCursor1 = false;
    this.dragCursor2 = false;
    let click1 = false;
    let click2 = false;

    document.getElementById('boxCursor1').addEventListener(
      'mousedown',
      (e) => {
        if (this.activecursor1 == true) {
          e.preventDefault();
          click1 = true;
        }
      },
      false
    );
    // document.getElementById('cursorPlot').addEventListener('mousemove', () => {if(click1==true)this.dragCursor1 = true});
    // document.getElementById('cursorPlot').addEventListener('mouseup', () => {
    //   //console.log(this.drag+" "+click)
    //   if(click1==true && this.dragCursor1==true){
    //   click1=false
    //   this.dragCursor1=false
    //   }
    // });
    document.getElementById('boxCursor1').addEventListener(
      'mousedown',
      (e) => {
        if (this.activecursor2 == true) {
          e.preventDefault();
          click2 = true;
          // console.log('MOUSE DOWN');
        }
      },
      false
    );
    document.getElementById('boxCursor2').addEventListener(
      'mousedown',
      (e) => {
        if (this.activecursor2 == true) {
          e.preventDefault();
          click2 = true;
          // console.log('MOUSE DOWN');
        }
      },
      false
    );
    document.getElementById('cursorPlot').addEventListener(
      'mousemove',
      (e) => {
        e.preventDefault();
        if (click1 == true) this.dragCursor1 = true;
        if (click2 == true) this.dragCursor2 = true;
        // console.log('MOUSE MOVE');
      },
      false
    );
    document.getElementById('boxCursor2').addEventListener('mouseup', (e) => {
      //console.log(this.drag+" "+click)
      e.preventDefault();
      //  console.log('MOUSE UP');
      if (click1 == true && this.dragCursor1 == true) {
        click1 = false;
        this.dragCursor1 = false;
      }
      if (click2 == true && this.dragCursor2 == true) {
        click2 = false;
        this.dragCursor2 = false;
      }
    });
    document.getElementById('cursorPlot').addEventListener('mouseup', (e) => {
      //console.log(this.drag+" "+click)
      e.preventDefault();
      // console.log('MOUSE UP');
      if (click1 == true && this.dragCursor1 == true) {
        click1 = false;
        this.dragCursor1 = false;
      }
      if (click2 == true && this.dragCursor2 == true) {
        click2 = false;
        this.dragCursor2 = false;
      }
    });
    document.addEventListener('pointercancel', () => {
      //console.log('POINTER CANCEL');
      click2 = false;
      this.dragCursor2 = false;
    });
  }
}
