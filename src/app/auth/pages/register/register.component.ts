import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { AuthService } from '../../services/auth.service';
import { ValidatorService } from 'src/app/shared/validator.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registroFormulario: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required, Validators.minLength(6)]]
  }, {
    validators: [this.validatorService.camposIguales('password', 'confirmPassword')]
  });
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private validatorService: ValidatorService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  campoNoValido(campo: string) {
    return this.registroFormulario.get(campo)?.invalid
      && this.registroFormulario.get(campo)?.touched;
  }


  registrarUsuario(){
    console.log('Valor de formulario', this.registroFormulario.value);
    const { name, email, password } = this.registroFormulario.value;

    this.authService.registrarUsuario(name, email, password)
    .subscribe(ok => {
      if(ok === true){
        this.router.navigateByUrl('/heroes/homes');
      } else {
        Swal.fire('Error', ok, 'error')
      }
    })
  }

}
