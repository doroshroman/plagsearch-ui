import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  
  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
              private router: Router, private socialAuthService: SocialAuthService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getAccessToken()){
      this.isLoggedIn = true;
      this.router.navigate(['home']);
    }

    // Check if user is logged with google account
    this.socialAuthService.authState.subscribe((user) => {
      if(user) {
        this.authService.loginWithGoogle(user.idToken).subscribe(
          data => {
            this.loginSuccessful(data);
          },
          err => {
            this.loginFailed(err);
          }
        );
      }
    });
  }
  private loginSuccessful(data: any): void {
    this.tokenStorage.saveAccessToken(data.accessToken);
    this.tokenStorage.saveRefreshToken(data.refreshToken);

    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.reloadPage();
  }
  private loginFailed(err: any): void {
    this.errorMessage = err.error.message;
    this.isLoginFailed = true;
  }

  signInWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  refreshGoogleToken(): void {
    this.socialAuthService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }
  onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.loginSuccessful(data);
      },
      err => {
        this.loginFailed(err);
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
