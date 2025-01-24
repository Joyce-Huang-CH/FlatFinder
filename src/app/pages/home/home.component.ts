import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { FlatService } from '../../core/services/flat.service';
import { Flat } from '../../../models/flat.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MaterialModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  firstName: string = "";
  flats: Flat[] = [];

  constructor( private authService: AuthService, private flatService: FlatService ){}

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

      this.flats = await this.flatService.getAllFlats();
    } catch (error) {
      console.error('error:', error);
    }
  }
}
