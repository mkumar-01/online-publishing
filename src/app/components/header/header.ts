import { Component, Inject, inject, OnInit, signal } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { DOCUMENT } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header implements OnInit {
  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {
  }
  public userPicture = signal<string | undefined>(undefined);

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
  ngOnInit(): void {
    this.auth.user$.subscribe(items => {
      this.userPicture.set(items?.picture)
    })
  }
}
