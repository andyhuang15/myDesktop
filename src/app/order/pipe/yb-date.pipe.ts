import { Pipe, PipeTransform } from '@angular/core';
const toDouble = (n:number) =>  n > 10? n: '0' + n;
@Pipe({
  name: 'ybDate'
})

export class YbDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) {
      return "";
    }
    var date = new Date(parseInt(value.replace("/Date(", "").replace(")/", ""), 10));
    return `${date.getFullYear()}-${toDouble(date.getMonth() + 1)}-${toDouble(date.getDay())}  ${toDouble(date.getHours())}:${toDouble(date.getMinutes())}`;
  }

}
