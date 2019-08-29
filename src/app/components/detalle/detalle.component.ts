import { Component, OnInit, Input } from '@angular/core';
import { identifierModuleUrl } from '@angular/compiler';
import { MoviesService } from '../../services/movies.service';
import { PeliculaDetalle, Actores, Cast } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DataLocalService } from '../../services/data-local.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {

  @Input() id;
  pelicula: PeliculaDetalle = {};
  actores: Cast [] = [];
  oculto = 150;
  estrella = 'start-outline';

  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -5
  };

  constructor(private movieService: MoviesService, private modalCtrl: ModalController,
              private dataLocal: DataLocalService) {}

  ngOnInit() {

    this.dataLocal.existeFavPelicula(this.id).then( existe => this.estrella = (existe) ? 'star' : 'star-outline');

    this.movieService.getDetalles(this.id).subscribe (resp => {
      this.pelicula = resp;
    });

    this.movieService.getActores(this.id).subscribe (resp => {
      this.actores = resp.cast;
    });
  }

  regresar() {
    this.modalCtrl.dismiss();
    }

  guardarFavorito() {
    const existe =  this.dataLocal.guardarPelicula(this.pelicula);
    this.estrella = (existe) ? 'star' : 'star-outline';
  }



}
