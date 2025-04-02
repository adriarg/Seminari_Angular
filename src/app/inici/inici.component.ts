import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-inici',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inici.component.html',
  styleUrl: './inici.component.css'
})
export class IniciComponent {
  
  constructor(private router: Router) {}
  
  anarLogin(): void {
    this.router.navigate(['/login']);
  }
  
  anarRegistre(): void {
    this.router.navigate(['/registre']);
  }
}
