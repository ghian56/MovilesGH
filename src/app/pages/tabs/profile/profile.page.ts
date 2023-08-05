import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  user = {} as User
  constructor(
    private firebaseSvc:FirebaseService,
    private utilSvc:UtilsService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.getUser()
  }

  getUser(){
    return this.user = this.utilSvc.getElementFromLocalStorage('user')
  }


  signOut() {
    this.utilSvc.presentAlert({
      header: 'Cerrar sesión',
      message: '¿Quieres cerrar sesión?',
      mode:'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          
        }, {
          text: 'Si, cerrar',
          handler: () => {
            this.firebaseSvc.signOut();
          }
        }
      ]
    })
  
   
  }

}
