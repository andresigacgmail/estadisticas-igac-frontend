import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatfecha'
})
export class FormatfechaPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): unknown {
    return value.toString().substring(0, 10) +" "+ value.toString().substring(11, 19);
  }

}
