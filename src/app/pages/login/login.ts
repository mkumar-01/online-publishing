import { CommonModule } from '@angular/common';
import { Component, Inject, NgModule } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';

import { FormControl, FormGroup, FormsModule, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { access_token } from '../../constant';

@Component({
  selector: 'login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {
    console.log(this.auth)
  }
  login() {
    // this.auth.loginWithRedirect();
    this.auth.loginWithPopup()
  }
  logout() {
    this.auth.logout({
      logoutParams: {
        returnTo: this.document.location.origin
      }
    });
  }

}
