import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
      },
      {
        path: 'information',
        loadChildren: () => import('./information/information.module').then(m => m.InformationPageModule)
      },
      {
        path: 'foro',
        loadChildren: () => import('./foro/foro.module').then(m => m.ForoPageModule)
      }, 
      {
        path: 'calendario',
        loadChildren: () => import('./calendario/calendario.module').then(m => m.CalendarioPageModule)
      }
    ]
  },




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule { }
