import { Component, Inject, OnInit, } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule, DOCUMENT } from '@angular/common';
interface UserProfile {
  name: string,
  email: string,
  picture: string,
}
@Component({
  selector: 'profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {
    console.log(this.auth)
  }
  ngOnInit() {

  }

}
