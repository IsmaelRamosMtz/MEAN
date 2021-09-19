import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styles: [
  ]
})
export class ListadoComponent implements OnInit {

  heroes: Heroe[] = [];

  constructor(
    private router: Router,
    private _heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.listadoDeHeroes();
  }

  listadoDeHeroes(){
    this._heroesService.listadoDeHeroes().subscribe(resp => {
      this.heroes = resp;
      // console.log(resp);
    })
  }

}
