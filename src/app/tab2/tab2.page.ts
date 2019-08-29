import { Component } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Peliculas } from '../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../components/detalle/detalle.component';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  textoBuscar = '';
  buscando = false;
  resultadoPeliculas: Peliculas [] = [];
  // tslint:disable-next-line: max-line-length
  recomendaciones: string[] = ['El Hobbit', 'El Señor de los Anillos Las Dos Torres', 'La Comunidad del Anillo', 'Spider-Man: Into the Spider-Verse', 'Matrix'];

  constructor(private serviceMovies: MoviesService, private modalCtrl: ModalController) {}

  buscar(event) {
    const valor: string = event.detail.value;

    if (valor.length === 0) {
      this.buscando = false;
      this.resultadoPeliculas = [];
      return;
    }

    this.buscando = true;
    this.serviceMovies.buscarPeliculas(valor).subscribe(data => {
      // tslint:disable-next-line: no-string-literal
      this.resultadoPeliculas = data['results'];
      this.buscando = false;
    });

  }

  async detallePelicula(id: string) {
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }
}
