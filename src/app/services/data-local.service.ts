import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { PeliculaDetalle } from '../interfaces/interfaces';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  peliculasStorage: PeliculaDetalle [] = [];

  constructor(private storage: Storage, private toastCtrl: ToastController) {
    this.cargarFavoritos();
  }

  guardarPelicula(pelicula: PeliculaDetalle) {

    let existe = false;
    let mensaje = '';

    for (const peli of this.peliculasStorage) {
      if (peli.id === pelicula.id){
        existe = true;
        break;
      } else {

      }
    }

    if (existe) {
      this.peliculasStorage = this.peliculasStorage.filter(peli => peli.id !== pelicula.id);
      mensaje = 'Removido de Favoritos';
    } else {
      this.peliculasStorage.push(pelicula);
      mensaje = 'Agregada a Favoritos';
    }
    this.presentToast(mensaje);
    this.storage.set('peliculas', this.peliculasStorage);

    return !existe;
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000
    });
    toast.present();
  }

  async cargarFavoritos() {
    const peliculas = await this.storage.get('peliculas');
    this.peliculasStorage = peliculas || [];
    return this.peliculasStorage;
  }

  async existeFavPelicula(id) {
    id = Number(id);

    await this.cargarFavoritos();

    const existe = this.peliculasStorage.find(peli => peli.id === id);

    return (existe) ? true : false;
  }

}
