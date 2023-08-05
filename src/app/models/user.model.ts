export interface User{
    uid:string;
    name:string,
    email:string,
    password?:string,
    profileImage?: string; // Propiedad para representar la imagen del usuario (puede ser una URL, base64, etc.)

}