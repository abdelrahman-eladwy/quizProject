import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userName = new BehaviorSubject<string | null>(null);

  setUserName(name: string | null) {
    this.userName.next(name);
  }

  getUserName() {
    return this.userName.asObservable();
  }
}
