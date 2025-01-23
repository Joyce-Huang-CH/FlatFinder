import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { AuthService } from '../../core/services/auth.service';
import { FlatService } from '../../core/services/flat.service';
import { MaterialModule } from '../../material/material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, HeaderComponent, MaterialModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private flatService: FlatService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
}
