import { inject, Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../../core/Services/user-service';

@Pipe({
  name: 'firstWord',
})
export class FirstWordPipe implements PipeTransform {
  private userService=inject(UserService);
  userEmail=this.userService.userName
  transform(value: string):string {
    return value.split(' ')[0];
  }
}
