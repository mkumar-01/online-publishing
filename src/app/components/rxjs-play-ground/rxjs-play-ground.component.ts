import { Component, OnInit } from '@angular/core';
import { from, timer, Observable, interval, fromEvent } from 'rxjs';
import { debounceTime, delayWhen, take, takeUntil } from 'rxjs/operators';
@Component({
  selector: 'rxjs-play-ground',
  imports: [],
  templateUrl: './rxjs-play-ground.component.html',
  styleUrl: './rxjs-play-ground.component.scss'
})
export class RxjsPlayGroundComponent implements OnInit {

  ngOnInit(): void {
    // Example of crational observable from
    from([1000, 2000, 3000]).pipe(
      delayWhen(x => timer(x))
    ).subscribe(console.log)

    //exmaple of creational observable interval
    interval(1000).pipe(
      takeUntil(timer(5000))
    ).subscribe(console.log);


    // console.log(searchInput)

    // fromEvent(searchInput, 'input').pipe(
    //   debounceTime(500) // Wait 500ms after last keystroke
    // ).subscribe(event => {
    //   console.log('Search:', event.target.value);
    // });

  }


}
