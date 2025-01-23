import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  firstName: string = '';
  isAdmin: boolean = false;

  constructor(
    public authService: AuthService,
    private router: Router,
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToAdmin() {
    this.router.navigate(['/admin']);
  }

  async ngOnInit() {
    try {
      const currentUser = await this.authService.getCurrentUser();
      if (currentUser) {
        const userProfile = await this.authService.getUserProfile(
          currentUser.uid
        );
        if (userProfile) {
          this.firstName = userProfile.firstName || 'User';
          // console.log('userProfile:', userProfile);
          // console.log('userProfile.isAdmin:', userProfile.isAdmin);
        }
        if (userProfile.isAdmin) {
          this.isAdmin = true;
        }
      }
    } catch (error) {
      console.error('error:', error);
    }
  }
}
