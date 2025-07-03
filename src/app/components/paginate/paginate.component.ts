import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'paginate',
  imports: [],
  templateUrl: './paginate.component.html',
  styleUrl: './paginate.component.scss'
})
export class PaginateComponent implements OnInit {
  totalPost = input<number>();
  postPerPage = 10;
  currentPage = 1;
  previous() {
    console.log("previouse")
  }
  next() {
    console.log("previous")
  }
  paginate(event: MouseEvent) {
    const target = event.target as HTMLAnchorElement;
    console.log(target.innerHTML)
  }
  ngOnInit(): void {
    console.log("total posts ", this.totalPost())
  }

}
