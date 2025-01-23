import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material/material.module';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { FlatService } from '../../core/services/flat.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-add-flat', 
  standalone: true,
  imports: [CommonModule, MaterialModule, HeaderComponent],
  templateUrl: './add-flat.component.html',
  styleUrl: './add-flat.component.scss'
})
export class AddFlatComponent {

  constructor(
    private flatService: FlatService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  addFlatForm = new FormGroup({
    city: new FormControl('', [Validators.required]),
    streetName: new FormControl('', [Validators.required]),
    streetNum: new FormControl(0, [Validators.required]),
    postalCode: new FormControl('', [Validators.required]),
    areaSize: new FormControl('', [Validators.required]),
    hasAc: new FormControl(false),
    yearBuild: new FormControl(0, [Validators.required]),
    price: new FormControl(0, [Validators.required]),
    dateAvailable: new FormControl(Date, [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  addFlat() {
    try {
      this.flatService.createNewFlat(this.addFlatForm.value)
        .then(() => {
          console.log('success');
          this.snackBar.open('Success', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
          this.router.navigate(['/home']);
        })
        .catch(error => {
          console.error('error', error);
          this.snackBar.open('error', 'Close', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
          });
        });
    } catch (error) {
      console.error('error', error);
    }
  }
}

