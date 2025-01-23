import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  // isLoggedIn = signal(false);
  firstName: string = "";

  constructor( private authService: AuthService ){}

  startSearch() {

  }

  addListing() {

  }
  async ngOnInit() {
    try {
      const currentUser = await this.authService.getCurrentUser();
      if (currentUser) {
        const userProfile = await this.authService.getUserProfile(currentUser.uid);
        if (userProfile) {
          this.firstName = userProfile.firstName || 'User';
          console.log('userProfile:', userProfile);
        }
      }
    } catch (error) {
      console.error('error:', error);
    }
  }
}
