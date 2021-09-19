import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { of, pipe, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Usuario } from '../interfaces/Usuario';
import { AuthResponse } from '../interfaces/AuthResponse';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;
  private _usuario!: Usuario;

  get usuario() {
    return { ...this._usuario };
  }

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  registrarUsuario(name: string, email: string, password: string) {
    const url = `${this._baseUrl}/auth/new`;
    const body = { name, email, password };

    return this.http.post<AuthResponse>(url, body)
      .pipe(
        tap(resp => {
          console.log('respuesta del servicio registro', resp);
          if (resp.ok === true) {
            localStorage.setItem('token', resp.token!)
          }
        }),
        map(resp => resp.ok),
        catchError(err => of(err.error.msg))
      )
  }

  loginUsuario(email: string, password: string) {
    const url = `${this._baseUrl}/auth/`;
    const body = { email, password };

    return this.http.post<AuthResponse>(url, body)
    .pipe(
      tap( resp => {
        if(resp.ok === true){
          localStorage.setItem('token', resp.token!)
        }
      }),
      map(resp => resp.ok),
      catchError(err => of(err.error.msg))
    )
  }

  validarToken(){
    const url = `${this._baseUrl}/auth//renew`;

    const headers = new HttpHeaders()
    .set('x-token', localStorage.getItem('token') || '');

    return this.http.get<AuthResponse>(url, { headers } )
    .pipe(
      tap(resp => {
        console.log('Resp de validar token 1', resp);

        if(resp.ok === true){
          localStorage.setItem('token', resp.token!)
          this._usuario = {
            name: resp.name!,
            uid: resp.uid!,
            email: resp.email!
          }
        }
      }),

      map(resp => {
        console.log('Resp de validar token 2', resp);
        return resp.ok
      }),
      catchError(err => of(false))
    )
  }

  
  logout() {
    this.router.navigateByUrl('/auth/login')
    localStorage.clear();
  }

  verificarSesion() {
    if(localStorage.getItem('token')!= ''){
      this.router.navigateByUrl('/heroes/listado')
    } else {
      this.router.navigateByUrl('/auth/');
    }
  }
}
