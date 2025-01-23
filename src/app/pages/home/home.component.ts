import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MaterialModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  firstName: string = "";

  constructor( private authService: AuthService ){}

  async ngOnInit() {
    try {
      const currentUser = await this.authService.getCurrentUser();
      if (currentUser) {
        const userProfile = await this.authService.getUserProfile(currentUser.uid);
        if (userProfile) {
          this.firstName = userProfile.firstName || 'User';
          // console.log('userProfile:', userProfile);
        }
      }
    } catch (error) {
      console.error('error:', error);
    }
  }
}
