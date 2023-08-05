import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import { User } from '../models/user.model';
import {getAuth,updateProfile, GoogleAuthProvider} from 'firebase/auth'
import { UtilsService } from './utils.service';
import { Auth } from 'firebase/auth';
import { resolve } from 'dns';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(
    private auth:AngularFireAuth,
    private db:AngularFirestore,
    private utilSvc:UtilsService,
  ) { }



  //------------Autenticación--------------//

  login(user:User){
    return this.auth.signInWithEmailAndPassword(user.email,user.password)
  }

  sigUp(user:User){
    return this.auth.createUserWithEmailAndPassword(user.email,user.password)
  }
  updateUsers(user:any){
    const auth = getAuth()
    return  updateProfile(auth.currentUser,user)

  }
  
  getAuthState(){
    return this.auth.authState
  }
  async signOut(){
    await this.auth.signOut();
    this.utilSvc.routerLink('/auth');
    localStorage.removeItem('user');
  }

  //================Firebase( Base de datos )===================// 
  // Leer
  getSubCollection(path: string,subColletionName:string){
    return this.db.doc(path).collection(subColletionName).valueChanges({idField :'id'}) 

  }
  //agregar
  addToSubColletion(path: string,subColletionName:string, object: any){
    return this.db.doc(path).collection(subColletionName).add(object)
  }

  //actualizar
  updateDocument(path: string, object:any){
    return this.db.doc(path).update(object)

  }
  //Eliminar
  deleteDocument(path: string){
    return this.db.doc(path).delete()

  }
  getUsers() {
    console.log("Calling getUsers()");
    return this.db
      .collection('users')
      .snapshotChanges()
      .pipe(
        map((actions) => {
          console.log("Received actions:", actions);
          return actions.map((a) => {
            const data = a.payload.doc.data() as User;
            const id = a.payload.doc.id;
            return { id, ...data };
          });
        })
      );
  }
  

}

