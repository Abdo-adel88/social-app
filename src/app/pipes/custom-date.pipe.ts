// custom-date.pipe.ts

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true,
})
export class CustomDatePipe implements PipeTransform {
  transform(value: string | Date): string {
    const date = new Date(value);

    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' }); // Apr
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    return `${day} ${month} ${year} • ${hours}:${minutes} ${ampm}`;
  }
}
