import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  loguearse(){
    const { email, password } =this.loginFormulario.value;

    this.authService.loginUsuario(email, password)
    .subscribe( ok => {
      console.log(ok)
      if(ok === true){
        this.router.navigateByUrl('/heroes/home')
      } else {
        Swal.fire('Error', ok, 'error');
      }
    })
  }
}
