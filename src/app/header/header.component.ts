import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() onChangedRoute = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  setRoute(event, route) {
    event.preventDefault();
    this.onChangedRoute.emit(route);
  }

}
