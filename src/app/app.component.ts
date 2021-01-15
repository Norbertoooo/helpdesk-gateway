import {Component, OnInit} from '@angular/core';
import {SharedService} from './services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'Helpdesk - Web';
  showTemplate = false;
  shared: SharedService;

  constructor() {
    this.shared = SharedService.getInstance();
  }

  ngOnInit(): void {
    this.shared.showTemplate.subscribe(
      show => this.showTemplate = show
    );
  }

  showContentWrapper(): any {
    return {
      'content-wrapper': this.shared.isLogged()
    };
  }
}
