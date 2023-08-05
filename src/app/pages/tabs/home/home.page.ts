import { Component, OnInit } from '@angular/core';
import { log } from 'console';
import { Tareas } from 'src/app/models/alergias.models';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { AddUpdateAlergiaComponent } from 'src/app/shared/components/add-update-alergia/add-update-alergia.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {


  user = {} as User
  alergias:Tareas[] = []
  loading : boolean = false;
   constructor(
    private firebaseSvc:FirebaseService,
    private utilSvc:UtilsService
   ) { }

  ngOnInit() {
   
  }
  
   ionViewWillEnter() {
     this.getTasks()
     this.getUser()
  }


  getUser(){
    return this.user = this.utilSvc.getElementFromLocalStorage('user')
  }

  getPercentage(alergia: Tareas){
    return this.utilSvc.getPercentage(alergia)
  }


 async AddOrUpdateAlergias(alergia?:Tareas){
   let res =  await this.utilSvc.presentModal({
     component: AddUpdateAlergiaComponent,
     componentProps:{alergia},
     cssClass:'add-update-modal'
  })
    if(res && res.success){
      this.getTasks()
    }
  }

  getTasks(){
    let user: User = this.utilSvc.getElementFromLocalStorage('user')
    let path = `users/${user.uid}`
    this.loading = true;
    let sub =this.firebaseSvc.getSubCollection(path, 'alergias').subscribe({
      next: (res: Tareas[]) => {
        console.log(res);
        this.alergias = res
        sub.unsubscribe()
        this.loading = false;
           }
    })
  }
  confirmDeletetask(alergia: Tareas) {
    this.utilSvc.presentAlert({
      header: 'Eliminar Tarea',
      message: '¿Quieres eliminar esta tarea?',
      mode:'ios',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          
        }, {
          text: 'Si, eliminar',
          handler: () => {
            this.deleteAlergia(alergia)
          }
        }
      ]
    })
  
   
  }

  deleteAlergia(alergia: Tareas) {
    let path = `users/${this.user.uid}/alergias/${alergia.id}`;

    this.firebaseSvc.deleteDocument(path).then(() => {

      this.utilSvc.dismisModal({ success: true });
      this.utilSvc.presentToast({
        message: 'Tarea eliminada exitosamente',
        color: 'success',
        icon: 'checkmark-circle-outline',
        duration: 1500
      });
      this.getTasks()
      this.utilSvc.dismissLoading();
    }).catch(error => {
      this.utilSvc.presentToast({
        message: error,
        color: 'warning',
        icon: 'alert-circle-outline',
        duration: 5000
      });
      this.utilSvc.dismissLoading();
    });
  }

}




  /**
   * Esta función recupera el objeto de usuario del almacenamiento local mediante un servicio de
   * utilidad.
   * @returns el valor de `this.user`, al que se le asigna el valor de
   * `this.utilSvc.getElementFromLocalStorage('user')`. El valor que se devuelve es un objeto que * representa a un usuario que se almacenó previamente en el almacenamiento local.
   **/
  // getUser(){
  //   return this.user = this.utilSvc.getElementFromLocalStorage('user')

  // }




  //   if(res && res.success){
  //     this.getAlergias();
  //   }
  // }



  /**
   * Esta función recupera las alergias de un usuario de una subcolección en Firebase y las almacena en
   * la propiedad "alergias" del componente.
   */
  // getAlergias(){
  //   let users:User = this.utilSvc.getElementFromLocalStorage('user')
  //   let path= `users/${users.uid}`
  //   this.loading = true;
  //   let sub = this.firebaseSvc.getSubColletion(path,'alergias').subscribe({
  //     next:(res : Tareas[]) =>{
  //       console.log(res);
  //       this.alergias = res
  //       sub.unsubscribe()
  //       this.loading = false;
  //     }
  //   })
  // }


  /* `confirmDeleteAlergia` es una función que presenta una alerta al usuario preguntándole si desea eliminar una alergia. Si el usuario selecciona "Si, eliminar" (Yes, delete), la función llama a `deleteAlergia` para eliminar la alergia de Firebase. Si el usuario selecciona "Cancelar"
  (Cancelar), la alerta se descarta y no pasa nada. */

  // confirmDeleteAlergia(alergia:Tareas){
  //   this.utilSvc.presentAlert({
  //     header: 'Eliminar alergia',
  //     message: '¿Quieres eliminar alergia?',
  //     mode:'ios',
  //     buttons: [
  //       {
  //         text: 'Cancelar',
  //         role: 'cancel',
          
  //       }, {
  //         text: 'Si, eliminar',
  //         handler: () => {
  //           this.deleteAlergia(alergia);
  //         }
  //       }
  //     ]
  //   })

  // }

  //  // ===== Actualizar alergia    ==== //
  //  deleteAlergia(alergia : Tareas){
  //   let path = `users/${this.user.uid}/alergias/${alergia.id}`;

  //   this.utilSvc.presentLoading();

  //   this.firebaseSvc.deleteDocument(path).then(res =>{
      
  //     this.utilSvc.presentToast({
  //       message: 'Alergia eliminada exitosamente',
  //       color:'success',
  //       icon:'checkmark-circle-outline',
  //       duration:1500
  //     })

  //     this.getAlergias();
  //     this.utilSvc.dismissLoading();


  //   },error =>{

  //     this.utilSvc.presentToast({
  //       message: error,
  //       color:'warning',
  //       icon:'alert-circle-outline',
  //       duration:5000
  //     })
  //     this.utilSvc.dismissLoading()

  //   })

  // }

//}
