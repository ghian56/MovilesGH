import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';



import { SharedModule } from 'src/app/shared/shared.module';
import { CalendarioPageRoutingModule } from './calendario-routing.module';

import { CalendarioPage } from './calendario.page'; 
import { NgCalendarModule } from 'ionic2-calendar';

//calenedario 

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
registerLocaleData(localeEs);

@NgModule({
  imports: [
    CalendarioPageRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    NgCalendarModule,

  ],
  declarations: [CalendarioPage]
})
export class CalendarioPageModule {}
