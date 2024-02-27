import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent implements OnInit {
  title = 'app';
  isSidebarOpen = false;
  isLoggin: boolean;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.isLoggin = this.authService.isLoggedIn;
  }

  ngOnInit() {
    if (!this.isLoggin) {
      this.router.navigateByUrl('/login');
    }
  }
}
