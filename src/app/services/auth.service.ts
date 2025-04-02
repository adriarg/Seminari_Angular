import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Usar la URL del backend local para el login
  private apiUrl = "http://localhost:9000/api/login";
  
  constructor(private http: HttpClient) { }
  
  login(credentials: { email: string; password: string }): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    // El controlador loginUserHandler espera exactamente 'name' y 'password'
    const loginData = {
      name: credentials.email, // Usando el email como nombre de usuario
      password: credentials.password
    };
    
    console.log('Enviando datos de login:', loginData);
    console.log('URL del login:', this.apiUrl);
    
    // Depuración adicional para ver qué está pasando
    return this.http.post(this.apiUrl, loginData, httpOptions)
      .pipe(
        tap(response => {
          console.log('Respuesta del login:', response);
        }),
        catchError(error => {
          console.error('Error en el login. Status:', error.status);
          console.error('Error en el login. Mensaje:', error.message);
          if (error.error) {
            console.error('Error en el login. Detalle:', error.error);
          }
          return throwError(() => error);
        })
      );
  }
}
