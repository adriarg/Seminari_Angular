import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { User, UserModel } from '../models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-registre',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './registre.component.html',
  styleUrl: './registre.component.css'
})
export class RegistreComponent implements OnInit {
  formulariRegistre: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.formulariRegistre = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      age: ['', [Validators.required, Validators.min(18)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    // No inicializamos con valores predeterminados
  }

  hasError(controlName: string, errorType: string): boolean {
    return this.formulariRegistre.get(controlName)?.hasError(errorType) 
           && this.formulariRegistre.get(controlName)?.touched 
           || false;
  }

  tornarInici(): void {
    this.router.navigate(['/']);
  }

  registrarUsuari(): void {
    if (this.formulariRegistre.invalid) {
      this.formulariRegistre.markAllAsTouched();
      return;
    }

    // Crear un nuevo usuario con los datos del formulario
    const nouUsuari = new UserModel({
      name: this.formulariRegistre.value.name,
      age: parseInt(this.formulariRegistre.value.age),
      email: this.formulariRegistre.value.email,
      password: this.formulariRegistre.value.password
    });

    console.log('Enviant dades d\'usuari al servidor:', nouUsuari);

    // Enviar los datos al servidor
    this.userService.registrarUsuari(nouUsuari).subscribe({
      next: (resposta) => {
        console.log('Usuari registrat amb èxit:', resposta);
        alert('Usuari registrat correctament!');
        this.router.navigate(['/login']);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error en registrar usuari. Codi:', error.status);
        console.error('Missatge:', error.message);
        console.error('Error complet:', error);
        
        if (error.status === 0) {
          alert('Error de connexió amb el servidor. Verifica que el backend estigui funcionant.');
        } else {
          try {
            // Intentar extraer el mensaje de error del cuerpo de la respuesta
            const errorMsg = error.error?.message || error.message;
            alert(`Error en registrar l'usuari: ${errorMsg}`);
          } catch (e) {
            alert(`Error en registrar l'usuari: ${error.message}`);
          }
        }
      }
    });
  }
}
