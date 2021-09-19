import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Heroe } from '../interfaces/heroes.interface';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private _baseUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  agregarHeroe(superHero: string, alterEgo: string, firstAppearance: string, characters: string, publisher: string, alt_img?: string){
    const url = `${this._baseUrl}/heroe/create`;
    const body = { superHero, alterEgo, firstAppearance, characters, publisher, alt_img };

    return this.http.post<Heroe>(url, body)
    .pipe(
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    );
  }

  actualizarHeroe(id: any, superHero: string, alterEgo: string, firstAppearance: string, characters: string, publisher: string, alt_img?: string) {
    const url = `${this._baseUrl}/heroe/update`;
    const body = { id, superHero, alterEgo, firstAppearance, characters, publisher, alt_img };

    return this.http.post<Heroe>(url, body)
    .pipe(
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    );
  }

  eliminarHeroe(id: string){
    const url = `${this._baseUrl}/heroe/delete`;
    const body = { id };

    return this.http.post<Heroe>(url, body);
  }

  obtenerHeroe(superHero: any){
    const url = `${this._baseUrl}/heroe/heroeDetail`;
    const body = { superHero }
    return this.http.post<Heroe>(url, body)
    .pipe(
      map(resp => resp.heroe),
      catchError(err => of(err.error.msg))
    );
  }

  listadoDeHeroes(){
    const url = `${this._baseUrl}/heroe/list`
    return this.http.get<Heroe[]>(url);
  }
}
