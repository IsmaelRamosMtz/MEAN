import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';

import { ProtectedRoutingModule } from './protected-routing.module';
import { ImagenPipe } from './heroes/pipes/imagen.pipe';
import { ListadoComponent } from './heroes/pages/listado/listado.component';
import { AgregarComponent } from './heroes/pages/agregar/agregar.component';
import { HomeComponent } from './heroes/pages/home/home.component';
import { BuscarComponent } from './heroes/pages/buscar/buscar.component';
import { HeroeComponent } from './heroes/pages/heroe/heroe.component';
import { HeroeTarjetaComponent } from './heroes/components/heroe-tarjeta/heroe-tarjeta.component';

@NgModule({
  declarations: [
  
    ListadoComponent,
       AgregarComponent,
       HomeComponent,
       BuscarComponent,
       HeroeComponent,
       ImagenPipe,
       HeroeTarjetaComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    CommonModule,
    ProtectedRoutingModule
  ]
})
export class ProtectedModule { }
