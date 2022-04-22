import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userInitials'
})
export class UserInitialsPipe implements PipeTransform {

  transform(username: string): string {
    let initials = '';
    return username.split(' ').reduce((a, v) => {
      return a += v.substring(0,1)
    }, initials);
  }

}
