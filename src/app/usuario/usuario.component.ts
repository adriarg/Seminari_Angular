import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { User, UserModel } from '../models/user.model';
import { ColaboradoresComponent } from "../colaboradores/colaboradores.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-usuario',
  imports: [CommonModule, ColaboradoresComponent, FormsModule],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
  standalone: true
})
export class UsuarioComponent {

  foto: string;
  mostrardata: boolean;
  
  usuario: User = new UserModel({
    id: 1,
    name: "Toni",
    age: 40,
    email: "toni.oller@gmail.com"
  });
  
  constructor() {      
    this.foto = "https://github.com/tonioller.png";
    this.mostrardata = false;
  }

  mostrardatos(): void {
    this.mostrardata = true;
  }

  getName(Name: string): void {
    this.usuario.name = Name;
  }
}
