import { Component, OnInit, } from '@angular/core';
interface UserProfile {
  avatar: string,
  email: string,
  id: number,
  name: string,
  role: string,
  updatedAt: string
}
@Component({
  selector: 'profile',
  imports: [],
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {
  ngOnInit() {

  }

}
