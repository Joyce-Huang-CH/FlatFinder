import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../core/services/auth.service';
import { FlatService } from '../../core/services/flat.service';
import { MaterialModule } from '../../material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Flat } from '../../../models/flat.model';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MaterialModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {

  userId: string | undefined;
  userFlats: Flat[] = [];

  constructor(
    private authService: AuthService,
    private flatService: FlatService,
    private snackBar: MatSnackBar
  ) {}

  EMAIL_PATTERN = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(this.EMAIL_PATTERN)]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
  });

  async ngOnInit() {
    const currentUser = await this.authService.getCurrentUser();
    if (currentUser) {
      this.userId = currentUser.uid;
      const userProfile = await this.authService.getUserProfile(currentUser.uid);
      if (userProfile) {
        this.profileForm.patchValue({
          email: userProfile.email,
          firstName: userProfile.firstName,
          lastName: userProfile.lastName
        });
      }

      this.userFlats = await this.flatService.getUserFlats(currentUser.uid);
    }
  }

  async updateProfile() {
    if (this.profileForm.valid && this.userId) {
      try {
        await this.authService.updateUserProfile(this.userId, this.profileForm.value);
        this.snackBar.open('success', 'close', {
          duration: 3000
        });
      } catch (error) {
        this.snackBar.open('error', 'close', {
          duration: 3000
        });
      }
    }
  }
}
