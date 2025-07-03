import { Component, EventEmitter, input, OnChanges, OnInit, output, Output, signal, SimpleChanges } from '@angular/core';

@Component({
  selector: 'paginate',
  imports: [],
  templateUrl: './paginate.component.html',
  styleUrl: './paginate.component.scss'
})
export class PaginateComponent implements OnChanges {
  totalPost = input<number>(0);
  postPerPage = 10;
  numberOfPage: number[] = [];
  activePage = signal<number>(1);
  // @Output() pageChange = new EventEmitter<number>(); 
  pageChange = output<number>()
  previous() {
    const newPage = this.activePage() - 1;
    if (newPage >= 1) {
      this.activePage.set(newPage)
      this.pageChange.emit(newPage)
    }
  }
  next() {
    const newPage = this.activePage() + 1;
    if (newPage <= this.numberOfPage.length) {
      this.activePage.set(newPage)
      this.pageChange.emit(newPage)
    }
  }
  paginate(event: MouseEvent, page: number) {
    event.preventDefault()
    this.activePage.set(page);
    this.pageChange.emit(page);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalPost']) {
      this.totalPost()
    }
    this.calculatePagination()
  }
  calculatePagination() {
    let length = 0;
    if (this.totalPost() > 0) {
      length = Math.ceil(this.totalPost() / 10);
    }
    this.numberOfPage = Array.from({ length: length }, (value, index) => index + 1);
  }

}
