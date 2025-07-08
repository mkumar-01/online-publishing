import { Component, inject, OnInit, signal } from '@angular/core';
import { AppState } from '../../store/reducers';
import { Store } from '@ngrx/store';
import * as AuthorsActions from '../../store/actions/authors.actions';
import { Authors } from '../../store/models/authors.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'authors',
  standalone: true,
  imports: [CommonModule],

  templateUrl: './authors.component.html',
  styleUrl: './authors.component.scss'
})
export class AuthorsComponent implements OnInit {
  private store = inject<Store<AppState>>(Store);
  private endPoint = 'http://localhost:3000/authors';

  // public authorsData = signal<AuthorsResponse | null>(null);
  public authors = signal<Authors[]>([]);
  public loading = signal<boolean>(false);
  public error = signal<any>(null);

  ngOnInit(): void {
    this.store.dispatch(AuthorsActions.loadAuthors({ endPoint: this.endPoint }));
    this.store.select(state => state.authors).subscribe({
      next: (state) => {
        this.loading.set(state.loading);
        this.error.set(state.error)
        this.authors.set(state?.data)
      }
    }

    )
  }
}
