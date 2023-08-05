import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { type } from 'os';
import { parse } from 'path';
import { Item, Tareas } from 'src/app/models/alergias.models';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ItemReorderEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-add-update-alergia',
  templateUrl: './add-update-alergia.component.html',
  styleUrls: ['./add-update-alergia.component.scss'],
})
export class AddUpdateAlergiaComponent implements OnInit {


  @Input() alergia: Tareas;

  form = new FormGroup({
    id: new FormControl(''),
    title: new FormControl('', [Validators.required, Validators.minLength(4)]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(4)]),
    items: new FormControl([], [Validators.required, Validators.minLength(1)]),
  })
  user = {} as User
  constructor(
    private firebaseSvc: FirebaseService,
    private utilSvc: UtilsService
  ) { }

  /**
   * La función ngOnInit establece el valor de un formulario en función de una entrada de usuario
   * almacenada.
   */
  ngOnInit() {
    this.user = this.utilSvc.getElementFromLocalStorage('user')

    if (this.alergia) {
      this.form.setValue(this.alergia);
      this.form.updateValueAndValidity();

    }
  }
  submit() {
    if (this.form.valid) {
      if (this.alergia) {
        this.updateAlergia()
      } else {
        this.crearAlergia();
      }

    }
  }
  getPercentage() {
    return this.utilSvc.getPercentage(this.form.value as Tareas)
  }
  handleReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    this.form.value.items = ev.detail.complete(this.form.value.items);
    this.form.updateValueAndValidity();

  }


  removeItems(index: number) {
    this.form.value.items.splice(index, 1);
    this.form.controls.items.updateValueAndValidity();
  }

  /// crear Items////
  createItem() {
    this.utilSvc.presentAlert({
      header: 'Nueva Actividad',
      backdropDismiss: false,
      inputs: [{
        name: 'name',
        type: 'textarea',
        placeholder: 'Hacer algo ....'
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',

        }, {
          text: 'Agregar',
          handler: (res) => {
            res.name
            let item: Item = { name: res.name, completed: false };
            this.form.value.items.push(item);
            this.form.controls.items.updateValueAndValidity();
          }
        }
      ]

    })
  }

  /////// ========= Crear Nueva Tarea  ========== ///////////
  crearAlergia() {
    let path = `users/${this.user.uid}`;
    this.utilSvc.presentLoading();
    delete this.form.value.id;
    this.firebaseSvc.addToSubColletion(path, 'alergias', this.form.value).then(res => {

      this.utilSvc.dismisModal({ success: true });
      this.utilSvc.presentToast({
        message: 'Tarea guardada exitosamente',
        color: 'success',
        icon: 'checkmark-circle-outline',
        duration: 1500
      })

      this.utilSvc.dismissLoading()


    }, error => {

      this.utilSvc.presentToast({
        message: error,
        color: 'warning',
        icon: 'alert-circle-outline',
        duration: 5000
      })
      this.utilSvc.dismissLoading()

    })

  }
  //=====Crear o actulizar alergia=====//
  //----------------



  // ===== Actualizar tarea    ==== //
  updateAlergia() {
    let path = `users/${this.user.uid}/alergias/${this.alergia.id}`;
    let updatedData = { ...this.form.value }; // Assuming this.form.value contains the updated data
  
    this.utilSvc.presentLoading();
    delete updatedData.id; // Assuming you want to exclude the 'id' field from the update
  
    this.firebaseSvc.updateDocument(path, updatedData).then(() => {
      this.utilSvc.dismisModal({ success: true });
      this.utilSvc.presentToast({
        message: 'Tarea actualizada exitosamente',
        color: 'success',
        icon: 'checkmark-circle-outline',
        duration: 1500
      });
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
