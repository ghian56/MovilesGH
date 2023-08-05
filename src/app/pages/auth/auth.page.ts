import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GoogleAuthProvider } from 'firebase/auth';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  form = new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required])
  })
  constructor(
    private auth:AngularFireAuth,
    private firebaseSvc:FirebaseService,
    private utilsSvc: UtilsService
  ) { }

  ngOnInit() {  
  }
  async loginWithGoogle() {
    try {
      const provider = new GoogleAuthProvider();
      const res = await this.auth.signInWithPopup(provider);
      // El usuario ha iniciado sesión correctamente con Google
      console.log(res);
      let user: User = {
        uid: res.user.uid,
        name: res.user.displayName,
        email: res.user.email,
        profileImage: res.user.photoURL, // Aquí asignamos la URL de la imagen del perfil del usuario
      };
      this.utilsSvc.setElementInLocalStorage('user', user);
      this.utilsSvc.routerLink('/tabs/home');
  
      this.utilsSvc.dismissLoading();
      this.utilsSvc.presentToast({
        message: `Bienvenido de nuevo ${user.name}`,
        duration: 5000,
        color: 'primary',
        icon: 'person-outline',
      });
  
      this.form.reset();
    } catch (error) {
      // Algo salió mal, manejar el error aquí
      console.error(error);
    }
  }
  

  submit() {
    if (this.form.valid) {
      

      this.utilsSvc.presentLoading({message: 'Autenticando...'})
      this.firebaseSvc.login(this.form.value as User).then(async(res) => {
        console.log(res);

        let user:User ={
          uid:res.user.uid,
          name: res.user.displayName,
          email:res.user.email
        } 
        this.utilsSvc.setElementInLocalStorage('user',user)
        this.utilsSvc.routerLink('/tabs/home')

        this.utilsSvc.dismissLoading();
        this.utilsSvc.presentToast({
          message:`Bienvenido de nuevo ${user.name}`,
          duration:5000,
          color: 'primary',
          icon:'person-outline'
        })

        this.form.reset()
      },error =>{
        this.utilsSvc.dismissLoading();
        this.utilsSvc.presentToast({
          message:error,
          duration:1500,
          color: 'warning',
          icon:'alert-circle-outline'
        })
        
      })
    }
  }
  

}