import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { AngularFireStorage } from '@angular/fire/compat/storage'; // Importa AngularFireStorage

import { finalize } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from 'src/app/models/user.model';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { filter } from 'rxjs/operators';
import { ModalController, ToastController } from '@ionic/angular';
import { LoadingModalComponent } from 'src/app/shared/components/loading-modal/loading-modal.component';
import { Router } from '@angular/router';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Plugins } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';

interface ImageInfo {
  name: string;
  url: string;
  user: User;// Agrega el identificador único del usuario que subió la imagen

}

@Component({
  selector: 'app-foro',
  templateUrl: './foro.page.html',
  styleUrls: ['./foro.page.scss'],
})
export class ForoPage implements OnInit {
  @ViewChild('imageInput', { static: false }) imageInput: ElementRef<HTMLInputElement>;

  user = {} as User
  selectedImageUrl: string = null;
  isLoading: boolean = false; // Loading state variable

  images: ImageInfo[] = []; // Arreglo para almacenar las URLs de las imágenes
  selectedImageFile: File = null; // Variable para almacenar el archivo de imagen seleccionado
  constructor(private afStorage: AngularFireStorage,
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,// Agrega AngularFirestore
    private modalController: ModalController,
    private toastController: ToastController,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
    this.loadImages();
    // Obtener el usuario actual cuando se inicie la página
    this.afAuth.authState.pipe(
      filter((user) => Boolean(user)) // Filtramos solo cuando haya un usuario autenticado
    ).subscribe((user) => {
      this.user = {
        uid: user.uid,
        name: user.displayName || 'Usuario Anónimo',
        email: user.email || ''
      };
    });
  }
  async showLoadingModal() {
    const loadingModal = await this.modalController.create({
      component: LoadingModalComponent,
      backdropDismiss: false,
      cssClass: 'loading-modal'
    });
    await loadingModal.present();
    return loadingModal;
  }
  //Foto de camara 
  async takePhoto() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera
      });

      // Convert the base64-encoded image data to a Blob
      const blob = this.dataURLToBlob(image.dataUrl);

      // Upload the image to Firebase Storage
      const userId = this.user.uid;
      const userName = this.user.name || 'Usuario Anónimo';
      const filePath = `${userName}_${new Date().getTime()}.jpg`;
      const fileRef = this.afStorage.ref(filePath);
      const task = this.afStorage.upload(filePath, blob);

      // Handle the upload progress and result
      task.snapshotChanges().pipe(
        finalize(async () => {
          try {
            const url = await fileRef.getDownloadURL().toPromise();
            // The image has been uploaded successfully
            // You can now save the image URL to your database or display it in your app
          } catch (error) {
            // Handle upload error
          }
        })
      ).subscribe();
    } catch (error) {
      // Handle error
    }
  }

  dataURLToBlob(dataURL: string) {
    const binary = atob(dataURL.split(',')[1]);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
  }


  // Foto de camara

  loadImages() {
    const storageRef = this.afStorage.storage.ref();

    this.afAuth.authState.subscribe((user) => {
      if (user) {
        // Only proceed with fetching images if a user is logged in
        const userId = user.uid;
        const userName = user.displayName || 'Usuario Anónimo';
        const correo = user.email;
        console.log(user.email);

        storageRef.listAll().then((res) => {
          this.images = []; // Clear the existing images array before fetching new ones
          for (let i = res.items.length - 1; i >= 0; i--) {
            const itemRef = res.items[i];

            itemRef.getDownloadURL().then((url) => {
              const imageInfo: ImageInfo = {
                name: itemRef.name,
                url: url,
                user: { uid: userId, name: userName, email: correo }
              };
              this.images.unshift(imageInfo);
            });
          }
        });
      } else {
        // If the user is not logged in, clear the images array
        this.images = [];
      }
    });
  }

  // Método para manejar el evento de selección de archivo de imagen
  async onImageSelected(event: any) {
    const file = event.target.files[0];
    this.selectedImageFile = file;
    await this.uploadImage();
  }

  // Método para subir la imagen seleccionada a Firebase Storage
  async uploadImage() {
    if (this.selectedImageFile) {
      const loadingModal = await this.showLoadingModal();

      const userId = this.user.uid;
      const userName = this.user.name || 'Usuario Anónimo';
      const correo = this.user.email;
      const filePath = `${userName}_${this.selectedImageFile.name}`;
      const fileRef = this.afStorage.ref(filePath);
      const task = this.afStorage.upload(filePath, this.selectedImageFile);

      task.snapshotChanges().pipe(
        finalize(async () => {
          try {
            const url = await fileRef.getDownloadURL().toPromise();
            this.selectedImageUrl = url;
      
            const imageInfo: ImageInfo = {
              name: this.selectedImageFile.name,
              url: url,
              user: { uid: userId, name: userName, email: correo },
            };
      
            // Clear the file input by resetting its value to an empty string
            this.imageInput.nativeElement.value = '';
      
            // Hide the loading modal
            await loadingModal.dismiss();
      
            // Show a success toast
            this.showToast('Imagen enviada con éxito');
      
            // Reload the page after the modal is dismissed and the user confirms
      
            // Muestra una notificación push en el dispositivo del usuario
            PushNotifications['create']({ // Use square brackets notation here
              title: 'Nueva foto',
              body: `${userName} acaba de subir una nueva foto`
            });
            console.log( 'No hay notificacion',
              PushNotifications['create']({ // Use square brackets notation here
                title: 'Nueva foto',
                body: `${userName} acaba de subir una nueva foto`
              })
            )
          } catch (error) {
            console.error(error);
            // Hide the loading modal
            await loadingModal.dismiss();
      
            // Show an error toast
            this.showToast('Error al subir la imagen', 'danger');
          } this.router.navigate(['/tabs/foro']);
        })
      ).subscribe();
    }
  }

  //Imagen a whatsaap
  shareImage(imageInfo: ImageInfo) {
    const text = `Mira esta imagen compartida por ${imageInfo.user.name} en la app Taskman en el foro: ${imageInfo.url}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;

    // Para evitar problemas con CORS en algunos dispositivos, podemos utilizar el método sanitize para crear una URL segura
    const safeWhatsappUrl: SafeUrl =whatsappUrl;

    // Abrir el enlace en una nueva pestaña o ventana
    window.open(safeWhatsappUrl.toString(), '_system');
    console.log(safeWhatsappUrl);
  }



  extractUsername(url: string): string {
    // Decode the URL to handle spaces represented as "%20"
    const decodedUrl = decodeURIComponent(url);

    // Split the decoded URL by the first underscore character to get username and photo name
    const firstUnderscoreIndex = decodedUrl.indexOf('_');
    if (firstUnderscoreIndex !== -1) {
      const username = decodedUrl.substring(0, firstUnderscoreIndex).split('/').pop().split('.')[0];
      return username;
    }

    // If there's no underscore, extract the username as before
    const parts = decodedUrl.split('_');
    if (parts.length === 2) {
      const username = parts[0].split('/').pop().split('.')[0];
      return username;
    }

    // Return an empty string if the format is not as expected
    return '';
  }

  // Define the showToast method to show toasts
  async showToast(message: string, color: string = 'success') {
    const toast = await this.toastController.create({
      message: message,
      color: color,
      duration: 2000
    });
    await toast.present();
  }



}