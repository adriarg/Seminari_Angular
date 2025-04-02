import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { User, UserModel } from '../models/user.model';
import { Component, inject, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { ConfirmDialogComponent } from '../confirmDialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { NombrePipe } from '../pipes/nombre.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-colaboradores',
  imports: [CommonModule, NombrePipe, FormsModule],
  templateUrl: './colaboradores.component.html',
  styleUrl: './colaboradores.component.css',
  standalone: true
})
export class ColaboradoresComponent implements OnInit {
  users: User[] = [];
  query = 'b';
  //Para recibir el usuario que proviene del componente usuario
  @Input() usuario: User = new UserModel();
  //Para enviar el nombre seleccionado al componente usuario
  @Output() changeNameEvent = new EventEmitter<string>();

  // Para poder usar el componente de diálogo de confirmación
  dialog: MatDialog = inject(MatDialog);
  userService = inject(UserService);

  constructor() {
    this.users = [];
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  // Método para obtener usuarios del servidor
  obtenerUsuarios(): void {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        console.log(this.users);
        // Agrega el usuario actual a la lista si es necesario
        this.users.push(this.usuario);
      },
      error: (error) => {
        console.error('Error en la petición:', error);
      }
    });
  }

  // Método para cambiar el nombre - emite el evento al componente padre
  changeName(name: string): void {
    if (name) {
      this.changeNameEvent.emit(name);
    }
  }

  // Método para identificar usuarios en la lista
  trackByUserId(index: number, user: any): number {
    return user.id || index;
  }

  // Función para eliminar un usuario de la lista
  deleteUser(i: number): void {
    // Antes de eliminar un usuario se muestra un diálogo de confirmación
    const dialogRef = this.dialog.open(ConfirmDialogComponent);
    // Una vez se da al botón eliminar/cancelar en el diálogo de confirmación
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        console.log("delete User ", i);
        this.users.splice(i, 1);
      }
    });
  }
}
