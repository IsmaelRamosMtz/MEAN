import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ValidarTokenGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): Observable<boolean> | boolean {
    return this.authService.validarToken().pipe(
      tap((valid) => {
        console.log('es valido el token?', valid);        
        if (!valid) {
          // this.authService.verificarSesion();
        }
      })
    );
  }
  canLoad(): Observable<boolean> | boolean {
    return this.authService.validarToken().pipe(
      tap((valid) => {
        console.log('es valido el token?', valid);

        if (!valid) {
          // this.authService.verificarSesion();
        }
      })
    );
  }
}
