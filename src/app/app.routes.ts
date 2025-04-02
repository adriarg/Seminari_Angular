import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { RegistreComponent } from './registre/registre.component';
import { IniciComponent } from './inici/inici.component';

export const routes: Routes = [
  { path: '', component: IniciComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registre', component: RegistreComponent },
  { path: 'usuari', component: UsuarioComponent },
  { path: '**', redirectTo: '/' }
];
