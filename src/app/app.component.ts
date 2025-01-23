import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { AuthService } from './auth/auth.service';
import { OnInit } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'flat-finder';
  // constructor(public authService: AuthService){ }
  ngOnInit(): void {
    // this.authService.run();
  }
}
