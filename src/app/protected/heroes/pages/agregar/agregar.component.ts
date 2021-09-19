import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import Swal from 'sweetalert2';
import { switchMap } from 'rxjs/operators';

import { HeroesService } from '../../services/heroes.service';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
      img {
        width: 80%;
        border-radius: 5px;
      }
    `,
  ],
})
export class AgregarComponent implements OnInit {
  //#region DD de publisher
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics',
    },
    {
      id: 'Marvel Comics',
      desc: 'Marve - Comics',
    },
  ];
  //#endregion

  // Sirve para mostrar con la interpolacion el nombre e heroe que el usuario desea insertar
  nombreHeroe: string = '';

  params: any;

  heroe: Heroe = {
    superHero: '',
    alterEgo: '',
    firstAppearance: '',
    characters: '',
    publisher: '' || undefined,
    alt_img: '',
  };

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _heroesService: HeroesService,
    private _snackBar: MatSnackBar,
    private _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this._router.url.includes('editar')) {
      return;
    }
    this.params = this._activatedRoute.snapshot.params;
    //  console.log(this.params.id);
    this._heroesService.obtenerHeroe(this.params.id).subscribe((resp) => {
      // console.log(resp);
      this.agregarForm.controls['superHero'].setValue(resp.superHero);
      this.agregarForm.controls['alterEgo'].setValue(resp.alterEgo);
      this.agregarForm.controls['firstAppearance'].setValue(
        resp.firstAppearance
      );
      this.agregarForm.controls['characters'].setValue(resp.characters);
      this.agregarForm.controls['publisher'].setValue(resp.publisher);
      this.agregarForm.controls['alt_img'].setValue(resp.alt_img);
      console.log(this.agregarForm);
      this.heroe = resp;
    });

    this.changes();
  }

  //#region FORMULARIOS
  agregarForm: FormGroup = this._fb.group({
    superHero: ['', Validators.required],
    alterEgo: ['', Validators.required],
    firstAppearance: ['', Validators.required],
    characters: ['', Validators.required],
    publisher: ['', Validators.required],
    alt_img: [],
  });
  //#endregion

  resetTheForm(): void {
    this.agregarForm.reset();
    // this.agregarForm.markAs();
    this.agregarForm.markAsUntouched();
  }

  changes() {
    // Obtenemos el nombre del superheroes(funciona como ngModel)
    this.agregarForm.controls['superHero'].valueChanges.subscribe((change) => {
      // console.log(change); // Value inside the input field as soon as it changes
      this.nombreHeroe = change;
    });
  }
  //#endregion

  //#region Validar que los campos no tengan errors
  campoNoValido(campo: string) {
    return (
      this.agregarForm.controls[campo].errors &&
      this.agregarForm.controls[campo].touched
    );
  }
  //#endregion

  //#region Consumir servicios
  guardarHeroe() {
    const {
      superHero,
      alterEgo,
      firstAppearance,
      characters,
      publisher,
      alt_img,
    } = this.agregarForm.value;

    this._heroesService
      .agregarHeroe(
        superHero,
        alterEgo,
        firstAppearance,
        characters,
        publisher,
        alt_img
      )
      .subscribe((ok) => {
        if (ok === true) {
          this.resetTheForm();
          Swal.fire({
            icon: 'success',
            title: 'Héroe agregado éxito',
          });
          this._router.navigate(['/heroes/listado'])
        } else {
          Swal.fire('Error', ok, 'error');
        }
      });
  }

  actualizarHeroe(id: any) {
    const {
      superHero,
      alterEgo,
      firstAppearance,
      characters,
      publisher,
      alt_img,
    } = this.agregarForm.value;

    this._heroesService
      .actualizarHeroe(
        id,
        superHero,
        alterEgo,
        firstAppearance,
        characters,
        publisher,
        alt_img
      )
      .subscribe((ok) => {
        if (ok === true) {
          this.resetTheForm();
          Swal.fire({
            icon: 'success',
            title: 'Héroe actualizado con éxito',
          });
          this._router.navigate(['/heroes/listado']);
        } else {
          Swal.fire('Error', ok, 'error');
        }
      });
  }

  eliminarHeroe(id: any) {
  
        Swal.fire({
          title: '¿Estás seguro?',
          text: "¡No podrás revertir esto!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'Si, eliminar',
          cancelButtonColor: '#d33',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this._heroesService.eliminarHeroe(id).subscribe((resp) => {
              Swal.fire(
                '!Eliminado!',
                'El Héroe ha sido eliminado.',
                'success'
              )
              this._router.navigate(['/heroes/listado']);
            })
          }
        })
  }
  //#endregion
}
