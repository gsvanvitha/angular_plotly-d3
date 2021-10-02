import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';
import { LayoutComponent } from './layout/layout.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CursorComponent } from './cursor/cursor.component';

@NgModule({
  declarations: [
    AppComponent,
    ChildComponent,
    LayoutComponent,
    CursorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
