import { Component, OnInit } from '@angular/core';


import { alimentos } from 'src/app/models/alimentos.models';
import { User } from 'src/app/models/user.model';

import { UtilsService } from 'src/app/services/utils.service';
import { AlimentosinformacionPage } from 'src/app/shared/components/alimentosinformacion/alimentosinformacion.component';

@Component({
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
})
export class InformationPage implements OnInit {

  user = {} as User
  alimentos:alimentos[] = [
    {
      "id": "1",
      "title": "Informacion de la aplicación",
      "descripcion": "Sistema de notas de tareas, y proceso de actividades para los usuarios en proceso de elaboracion, actualmente se encuentra en la version V.7.7.3 actualizado 04/08/23"
      
    },    
  ]
  loading : boolean = false;
  constructor(
    private utilSvc:UtilsService
  ) { }

  ngOnInit() {

  }

  ionViewWillEnter() {
    this.getUser()
    this.getAlimentos();
    
  }

  getUser(){
    return this.user = this.utilSvc.getElementFromLocalStorage('user')

  }


  getAlimentos(){
    
    this.loading = true;
    for (let index = 0; index < this.alimentos.length; index++) {
      const element = this.alimentos[index];
    }
    

  }


  //Boton abrir mas informacion de las alergias

  async abrirBoton(alimentos?:alimentos){
    let res = await this.utilSvc.presentModal({
      component:AlimentosinformacionPage,
      componentProps: {alimentos},
      cssClass:'alimentosinformacion'
    })
    if (res && res.success){
      this.getAlimentos();
    }
  }


 



}
