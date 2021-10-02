import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js-dist';

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.css']
})
export class CursorComponent implements OnInit {
  public xvalues;
  public yvalues;
  public originalTrace;
  public dummyTrace1;
  public dummyTrace2;
  public data;
  public layout;
  public curxcursor1;
  public curycursor1;
  public curxcursor2;
  public curycursor2;
  public activecursor1 = true;
  public activecursor2 = true;
  constructor() { }


  ngOnInit(): void {

     this.xvalues = ['01-01-2021','01-02-2021','03-01-2021','04-01-2021','05-01-2021','06-01-2021','07-01-2021','08-01-2021','09-01-2021',]
     this.yvalues = [10,20,30,20,10,70,90,80,30]

     this.originalTrace = {
      x: this.xvalues,
      y: this.yvalues,
      mode: 'lines+markers',
      type: 'scatter',
      marker: { size: 8, symbol:'circle',color: 'green', opacity:'0.3' },
      line : {dash:'solid', width:1, color: 'green', opacity:'0.3'}
    };

     this.dummyTrace1 = {
      x : [],
      y : [],
      mode : 'text',
      type : 'scatter',
      text : ['ϕ'],
      textfont: {
        size: 15,
        color: 'green'
      }
    };

    this.dummyTrace2 = {
      x : [],
      y : [],
      mode : 'text',
      type : 'scatter',
      text : ['⌖'],
      textfont: {
        size: 25,
        color: 'green'
      }
    };

     this.data = [this.originalTrace]

     this.layout = {

      xaxis : {
        linecolor: 'grey',
        linewidth : 2,
        title : 'x-axis',
        range : [-1,10],
        zeroline : false
      },
      yaxis : {
        linecolor: 'grey',
        linewidth : 2,
        title : 'y-axis',
        range : [-10,100],
        zeroline : false
      },
      title : 'Cursors Plot'
    };

    Plotly.newPlot('cursorPlot',this.data,this.layout);

    this.curxcursor1 = this.xvalues.length-2;
    this.curycursor1 = this.yvalues.length-2;

    this.curxcursor2 = 1;
    this.curycursor2 = 1;
  }

  currentTraceValues(){
    this.dummyTrace1.x = [this.xvalues[this.curxcursor1]]
    this.dummyTrace1.y = [this.yvalues[this.curycursor1]]
    this.dummyTrace2.x = [this.xvalues[this.curxcursor2]]
    this.dummyTrace2.y = [this.yvalues[this.curycursor2]]
  }

  addCursor1(){
      this.currentTraceValues();
      this.checkActive();
      Plotly.react('cursorPlot',this.data,this.layout);
  }

  addCursor2(){
    this.currentTraceValues();
    this.checkActive();
    Plotly.react('cursorPlot',this.data,this.layout);
  }

  cursorLeft(){
    this.curxcursor1--;
    this.curycursor1--;
    if(this.curxcursor1==-1) this.curxcursor1 = this.xvalues.length-1;
    if(this.curycursor1==-1) this.curycursor1 = this.yvalues.length-1;
    this.curxcursor2--;
    this.curycursor2--;
    if(this.curxcursor2==-1) this.curxcursor2 = this.xvalues.length-1;
    if(this.curycursor2==-1) this.curycursor2 = this.yvalues.length-1;
    this.currentTraceValues();
    Plotly.react('cursorPlot',this.data,this.layout);
  }

  cursorRight(){
    this.curxcursor1++;
    this.curycursor1++;
    if(this.curxcursor1==this.xvalues.length) this.curxcursor1 = 0;
    if(this.curycursor1==this.yvalues.length) this.curycursor1 = 0;
    this.curxcursor2++;
    this.curycursor2++;
    if(this.curxcursor2==this.xvalues.length) this.curxcursor2 = 0;
    if(this.curycursor2==this.yvalues.length) this.curycursor2 = 0;
    this.currentTraceValues();
    Plotly.react('cursorPlot',this.data,this.layout);
  }

  cursorStatus(option){
    if(option == 'both') {
        this.activecursor1 = true;
        this.activecursor2 = true;
        this.addCursor1();
        this.addCursor2();
      }
    else if(option == '1') {
        this.activecursor1 = true;
        this.activecursor2 = false;
        this.addCursor1();
      }
    else if(option == '2') {
        this.activecursor1 = false;
        this.activecursor2 = true;
        this.addCursor2();
      }
    else if(option == 'none') {
        this.activecursor1 = false;
        this.activecursor2 = false;
      }
      this.checkActive();
      console.log(this.activecursor1+' '+this.activecursor2);
      Plotly.react('cursorPlot',this.data,this.layout);
  }

  checkActive(){
    if(this.activecursor1==true && this.activecursor2==true) this.data = [this.originalTrace,this.dummyTrace1,this.dummyTrace2]
    if(this.activecursor1==true && this.activecursor2==false) this.data = [this.originalTrace,this.dummyTrace1]  
    if(this.activecursor1==false && this.activecursor2==true) this.data = [this.originalTrace,this.dummyTrace2]
    if(this.activecursor1==false && this.activecursor2==false) this.data = [this.originalTrace]
    console.log('active')
    console.log(this.data)
  }

  ngAfterContentInit(){
    
  }

}
