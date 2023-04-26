import { Component, OnInit } from '@angular/core';
import { HeaderTitleService } from './header-title.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  title = '';
  constructor(private headerTitleService: HeaderTitleService) {}

  ngOnInit(): void {
    this.headerTitleService.title.subscribe((title) => {
      this.title = title;
    });
  }
}
