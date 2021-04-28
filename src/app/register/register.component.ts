import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router,
              private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getAccessToken()){
      this.router.navigate(['home']);
    }
  }

  onSubmit(): void {
    this.authService.register(this.form).subscribe(
      data => {
        this.tokenStorage.saveAccessToken(data.access_token);
        this.tokenStorage.saveRefreshToken(data.refresh_token);

        this.isSuccessful = true;
        this.isSignUpFailed = false;
        
        this.router.navigate(['home']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}
