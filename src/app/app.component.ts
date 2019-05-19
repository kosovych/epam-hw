import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'recipes';
  route = window.location.pathname;

  changedRoute(route) {
    this.route = route;
    window.history.pushState(null, null, route);
  }
}
