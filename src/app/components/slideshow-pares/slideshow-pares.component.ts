import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Peliculas } from '../../interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares',
  templateUrl: './slideshow-pares.component.html',
  styleUrls: ['./slideshow-pares.component.scss'],
})
export class SlideshowParesComponent implements OnInit {

  @Input() peliculas: Peliculas[] = [];
  @Output() cargarmas = new EventEmitter();

  slideOpts = {
    slidesPerView: 3.2,
    freeMode: true,
    spaceBetween: -15,
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cargarMovies() {
    this.cargarmas.emit();
  }

  async verDetalle(id: string){
    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    modal.present();
  }
}
