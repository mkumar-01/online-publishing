import { Component, input, OnInit, output } from '@angular/core';

@Component({
  selector: 'modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent implements OnInit {
  onClose = output<boolean>();
  onPreviewSubmit = output<boolean>();
  postData = input<any>();
  cancel() {
    this.onClose.emit(false)
  }
  onSubmit() {
    this.onPreviewSubmit.emit(true)
    this.onClose.emit(false)
  }
  ngOnInit() {
    this.postData()
  }
}
