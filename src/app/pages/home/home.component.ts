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

  isLoggedIn = signal(false);
  firstName: string | null = null;

  constructor( private authService: AuthService ){}

  startSearch() {

  }

  addListing() {

  }
  ngOnInit() {
    const loginUser = this.authService.getCurrentUser();
    console.log(loginUser)

    // try {
    //   const user = await this.authService.getCurrentUser(); // 取得當前登入的使用者 
    //   console.log(user)
    //   if (user) {
    //     this.isLoggedIn.set(true); // 使用 signal 設定登入狀態
    //     const userData = await this.authService.getUserProfile(user.uid); // 從 Firestore 取得使用者資料 
    //     console.log(userData)
    //     if (userData) {
    //       this.firstName = userData.firstName;
    //     }
    //   }
    // } catch (error) {
    //   console.error('Error fetching user data:', error);
    // }
  }
}
