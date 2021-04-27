import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { SocialAuthService } from "angularx-social-login";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLoggedIn = false;
  username: string = '';

  constructor(private tokenStorageService: TokenStorageService,
              private socialAuthService: SocialAuthService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getAccessToken();

    if (this.isLoggedIn) {
      console.log("Log in success!");
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();

    // logout from google account
    this.socialAuthService.signOut();
    window.location.reload();
  }
}
