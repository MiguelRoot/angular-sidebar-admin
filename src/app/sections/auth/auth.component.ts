import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  private router = inject(Router);

  onLogin() {
    this.router.navigate(['/admin'], { replaceUrl: true });
  }
}
