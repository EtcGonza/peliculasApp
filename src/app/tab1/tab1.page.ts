import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../services/movies.service';
import { Peliculas } from '../interfaces/interfaces';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{

  peliculasRecientes: Peliculas[] = [];
  populares: Peliculas[] = [];

  constructor(private serviceMovie: MoviesService) {}

  ngOnInit() {
    this.serviceMovie.getRecientes().subscribe(data => {
      // console.log(data);
      this.peliculasRecientes = data.results;
    });
    this.getPopulares();
  }

  cargarMas() {
    this.getPopulares();
  }

  getPopulares() {
    this.serviceMovie.getPopulares().subscribe(data => {
      const arrTemp = [...this.populares, ...data.results];
      this.populares = arrTemp;
    });
  }
}
