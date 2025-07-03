import { Component, output } from '@angular/core';

@Component({
  selector: 'search',
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  searchTerm = output<string>()
  onSearch(value: string) {
    this.searchTerm.emit(value)
  }
}
