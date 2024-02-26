import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../../admin/user-management/user-management.model';

@Pipe({
  standalone: true,
  name: 'checkFirstLastName',
})

export default class CheckFirstLastName implements PipeTransform{
  transform(user: User): string {
    if(user.firstName && user.lastName){
      return user.firstName + " " + user.lastName;
    }
    return user.login ?? 'user login empty';
  }
}
