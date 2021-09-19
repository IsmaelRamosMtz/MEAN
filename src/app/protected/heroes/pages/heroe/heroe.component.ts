import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [
    `
  img {
    width: 100%;
    border-radius: 5px;
  }
  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  params: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _heroesService: HeroesService
  ) { }

  ngOnInit(): void {
    this.params = this._activatedRoute.snapshot.params;
    
    this._heroesService.obtenerHeroe(this.params.id)
    .subscribe(resp => {
      this.heroe = resp;
      console.log(this.heroe);
    })
    
  }

  regresar(){
    this._router.navigateByUrl('/heroes/listado')
  }

}
