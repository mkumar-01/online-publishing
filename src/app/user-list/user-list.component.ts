import { Component, inject, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

@Component({
  selector: 'user-list',
  imports: [],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  public allUsers: User[] = [];
  public userlist: User[] = [];
  private http = inject(HttpService);

  ngOnInit(): void {
    this.http.get<User[]>("https://jsonplaceholder.typicode.com/users").subscribe((items) => {
      // Add firstName + lastName
      const usersWithNames = items.map(user => {
        const parts = user.name.split(" ");
        return {
          ...user,
          firstName: parts[0],
          lastName: parts.slice(1).join(" ")
        };
      });

      this.allUsers = usersWithNames;
      this.userlist = usersWithNames;
    })
  }

  search(event: Event) {
    const input = event.target as HTMLInputElement;
    const value = input.value.toLowerCase();

    // this.userlist = this.allUsers.filter(user =>
    //   user.lastName?.toLowerCase().includes(value) ||
    //   user.email?.toLowerCase().includes(value)
    // );
    this.userlist = this.allUsers.filter(items => {
      return items.lastName?.toLowerCase().includes(value)

    })
  }


}
