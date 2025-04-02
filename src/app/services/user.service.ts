import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // Verificamos la URL correcta basada en la configuración del backend
  private apiUrl = "http://localhost:9000/api";

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.apiUrl}/users`);
  }

  //No s'utilitza però es pot fer servir per obtenir un usuari en concret a partir de la seva id
  getUser(id: number): Observable<User>{
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }
  
  // Mètode per registrar un nou usuari - ja no necessitem que sigui de tipus User
  registrarUsuari(usuari: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    
    console.log('URL de la API:', `${this.apiUrl}/users`);
    console.log('Dades a enviar:', JSON.stringify(usuari));
    
    return this.http.post<any>(`${this.apiUrl}/users`, usuari, httpOptions)
      .pipe(
        tap(resposta => console.log('Resposta del servidor:', resposta)),
        catchError(error => {
          console.error('Error en la petició HTTP:', error);
          throw error;
        })
      );
  }
}
