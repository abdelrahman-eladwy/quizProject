import { Component, ViewChild, ElementRef } from '@angular/core';
import { UserService } from '../service/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent {
  @ViewChild('name') nameKey!: ElementRef;
  @ViewChild('password') passwordKey!: ElementRef;
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router) {}

  storeUser() {
    if (
      this.nameKey.nativeElement.value &&
      this.passwordKey.nativeElement.value
    ) {
      this.userService.setUserName(this.nameKey.nativeElement.value);
      localStorage.setItem('password', this.passwordKey.nativeElement.value);
      this.router.navigate(['/question']);
    } else {
      this.errorMessage = 'Please enter both username and password';
    }
  }
}
