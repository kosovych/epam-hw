import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'decodeCategory'
})
export class DecodeCategory implements PipeTransform {
  transform(value: string): string {
    let result: string
    switch (value) {
      case "-L4N7j92qDMvS8BbgE5u":
        result = "Some Category 1"
        break;

      case "-L4N7j93c7MH0bR7rEH5":
        result = "Some Category 2"
        break;

      case "-L4N7j8yE8Thcztca1S_":
        result = "Some Category 3"
        break;

      case "-L4N7j92qDMvS8BbgE5t":
        result = "Some Category 4"
        break;

      default:
        break;
    }

    return result
  }
}
