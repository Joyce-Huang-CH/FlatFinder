import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, MaterialModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.EMAIL_PATTERN)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    isAdmin: new FormControl(false)
  });

  hide = signal(true);
  isLoading = false;

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  clickEvent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.hide.set(!this.hide());
  }

  async register() {
    if (this.registerForm.invalid) return;

    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    const firstName = this.registerForm.get('firstName')?.value;
    const lastName = this.registerForm.get('lastName')?.value;

    if (!email || !password || !firstName || !lastName) return;
    
    try {
      this.isLoading = true;
      await this.authService.register(email, password, firstName, lastName);
      this.snackBar.open('Registration complete. Redirecting to login...', 'Close', {
        duration: 1500,
        horizontalPosition: 'center',
        verticalPosition: 'top'
      });
      this.registerForm.reset();
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error('Registration error:', error);
      this.snackBar.open(
        error instanceof Error ? error.message : 'Registration failed. Please try again later.',
        'Close',
        {
          duration: 5000,
          panelClass: ['error-snackbar']
        }
      );
    } finally {
      this.isLoading = false;
    }
  }
}
