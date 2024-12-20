import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
  pure: true
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, maxLength: number, suffix = '...'): string {
    if (!value || value.length <= maxLength) {
      return value;
    }
    return value.substring(0, maxLength).trim() + suffix;
  }

}
