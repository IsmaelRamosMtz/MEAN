import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [],
})
export class BuscarComponent implements OnInit {

  filteredHeroes!: Observable<any[]>;
  heroesList: any;
  variableIdProducto: any;
  heroeSeleccionado: Heroe | undefined;

  valueControl: any;

  constructor(private _heroesService: HeroesService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.listadoHeroes();
    this.changes();
  }

  buscadorForm: FormGroup = this.fb.group({
    buscadorHeroesCtrl: []
  })

  changes() {
    // Obtenemos el nombre del superheroes(funciona como ngModel)
    this.buscadorForm.controls['buscadorHeroesCtrl'].valueChanges.subscribe((change) => {
      // console.log(change); // Value inside the input field as soon as it changes
      this.valueControl = change;
      console.log(this.valueControl);
      
    });
  }

  listadoHeroes() {
    this._heroesService.listadoDeHeroes().subscribe((resp) => {
      this.heroesList = [...resp];

      // if(this.valueControl === ''){
      //   this.buscadorForm.controls['buscadorHeroesCtrl'].setValue('xd');
      // }else {
        this.valueControl = this.buscadorForm.get('buscadorHeroesCtrl')!.valueChanges;
        console.log(this.valueControl);
        
      // }
      
      this.filteredHeroes = this.buscadorForm.get('buscadorHeroesCtrl')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterProductos(value))
      );
    });
  }

  _filterProductos(value: string): any[] {
    return this.heroesList.filter((option: any) => option.superHero.toString().toLowerCase().indexOf(value) === 0);
  }

  // Informcion de heroe
  obtenerInfoHeroe(heroe: any): void {
    this.heroeSeleccionado = heroe;
    console.log('Info heroe seleccionado', this.heroeSeleccionado);
  }
}
