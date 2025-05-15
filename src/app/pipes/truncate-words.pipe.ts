import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateWords',
})
export class TruncateWordsPipe implements PipeTransform {
  transform(title: string, limit: number = 3): string {
    const words = title.split(' ');

    return words.slice(0, limit).join(' ');
  }
}

