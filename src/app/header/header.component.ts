import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userName: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserName().subscribe((name) => {
      this.userName = name;
    });
  }
}
