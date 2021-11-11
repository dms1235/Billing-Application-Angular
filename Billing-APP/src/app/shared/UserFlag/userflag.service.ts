import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserflagService {
  private valueSource = new BehaviorSubject<boolean>(false);
  currentValue = this.valueSource.asObservable();

  constructor() {}

  changeValue(value: boolean) {
    this.valueSource.next(value);
  }
}
