import { CommonModule } from '@angular/common';
import { Component, inject, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  standalone: true
})
export class LoginComponent implements OnInit {
  
  date: Date = new Date("2025-08-14");
  Prova: string = "Este texto deberia estar en mayusculas";
  formularioLogin: FormGroup;
  authService = inject(AuthService);
  @Output() exportLoggedIn = new EventEmitter<boolean>();
  errorMensaje: string = '';

  constructor(
    private form: FormBuilder,
    private router: Router
  ){
    // Inicializamos el formulario con validadores menos estrictos para el campo de nombre de usuario
    this.formularioLogin = this.form.group({
      email: ['', [Validators.required]], // Quitamos la validación de email para permitir cualquier tipo de nombre de usuario
      password: ['', [Validators.required, Validators.minLength(1)]] // Reducimos la longitud mínima
    });
  }
  
  ngOnInit(): void {
    // No hacemos nada especial en la inicialización
  }
  
  hasError(controlName:string, errorType:string): boolean {
    return this.formularioLogin.get(controlName)?.hasError(errorType) && this.formularioLogin.get(controlName)?.touched || false;  
  }

  login(): void {
    if (this.formularioLogin.invalid) {
      this.formularioLogin.markAllAsTouched();
      return;
    }

    const loginData = this.formularioLogin.value;
    console.log('Intentando login con:', loginData);

    this.authService.login(loginData).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.errorMensaje = '';
        this.exportLoggedIn.emit(true);
        this.router.navigate(['/usuari']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error completo:', error);
        
        if (error.status === 0) {
          this.errorMensaje = 'Error de conexión con el servidor. Verifica que el backend esté funcionando.';
        } else if (error.status === 401) {
          this.errorMensaje = 'Credenciales incorrectas. Por favor, verifica tu usuario y contraseña.';
        } else {
          const errorMsg = error.error?.message || error.message;
          this.errorMensaje = `Error en el login: ${errorMsg}`;
        }
        alert(this.errorMensaje);
      }
    });
  }
  
  tornarInici(): void {
    this.router.navigate(['/']);
  }
}
