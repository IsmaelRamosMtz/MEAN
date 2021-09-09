import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { ListadoComponent } from './heroes/pages/listado/listado.component';
import { AgregarComponent } from './heroes/pages/agregar/agregar.component';
import { MaterialModule } from '../material/material.module';
import { HomeComponent } from './heroes/pages/home/home.component';
import { BuscarComponent } from './heroes/pages/buscar/buscar.component';
import { HeroeComponent } from './heroes/pages/heroe/heroe.component';

@NgModule({
  declarations: [
  
    ListadoComponent,
       AgregarComponent,
       HomeComponent,
       BuscarComponent,
       HeroeComponent,
  ],
  imports: [
    MaterialModule,
    CommonModule,
    ProtectedRoutingModule
  ]
})
export class ProtectedModule { }
