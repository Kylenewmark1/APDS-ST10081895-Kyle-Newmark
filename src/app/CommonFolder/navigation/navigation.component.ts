import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  // Constructor
  constructor(private authService: AuthService, private router: Router) {}

  // On user logout click event - Logs user out by removing auth token and redirects user to login - Session storage is also cleared to ensure no leaked usernames
  onLogoutClick(): void {
    this.authService.logout();
    sessionStorage.clear();
  }
}
