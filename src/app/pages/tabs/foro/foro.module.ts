import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForoPageRoutingModule } from './foro-routing.module';

import { ForoPage } from './foro.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingModalComponent } from 'src/app/shared/components/loading-modal/loading-modal.component';
import { defineCustomElements } from '@ionic/pwa-elements/loader';

// Call the defineCustomElements function here
defineCustomElements(window);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForoPageRoutingModule,
    SharedModule,  ///Diseño base
    MatProgressSpinnerModule,
  ],
  declarations: [ForoPage, LoadingModalComponent]
})
export class ForoPageModule {}
