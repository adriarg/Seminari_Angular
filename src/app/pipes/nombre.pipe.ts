import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user.model';
@Pipe({
  name: 'nombre',
  standalone: true
})
export class NombrePipe implements PipeTransform {

  transform(value: User[], query: string): User[] {
    if (query === '' || query === undefined) {
      return value;
    }
    return value.filter((user) => {
      if (user.name) {
        return user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
      }
      return false;
    });
  }

}
