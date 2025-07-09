import { Component, input, output } from '@angular/core';

@Component({
  selector: 'search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  placeholder = input<string>("Search");
  searchTerm = output<string>();
  onSearch(value: string) {
    this.searchTerm.emit(value)
  }
}
