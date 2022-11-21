import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secDate',
})
export class SecDatePipe implements PipeTransform {
  resDate: any;
  transform(value: any): any {
    if (!value) return value;
    const cal = value * 1000;

    this.resDate = new Date(cal);
    this.resDate =
      this.resDate.getDate() +
      '/' +
      (this.resDate.getMonth() + 1)
    //   '/' +
    //   this.resDate.getFullYear();

    return this.resDate;
  }
}
