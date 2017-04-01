import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'app-add-order-footer',
  templateUrl: './add-order-footer.component.html',
  styleUrls: ['./add-order-footer.component.scss']
})
export class AddOrderFooterComponent implements OnInit {
  @Input() searchQuery:string = '';
  @Input() dealerQueryStr:string = '';
  @Input() TotalValue:number = 0;
  @Input () curDealer:string = '';
  @Output() onProQueryChange = new EventEmitter<string>();
  @Output() onNext = new EventEmitter<any>();
  @Output() onDealerQueryChange  = new EventEmitter<string>();
  constructor() { }

  ngOnInit() {
  }
  proQueryChange () {
    this.onProQueryChange.emit(this.searchQuery);
  }
  dealerQueryChange () {
    this.onDealerQueryChange.emit(this.dealerQueryStr);
  }
  submitClick () {
    this.onNext.emit('');
  }
}
