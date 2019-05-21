import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[boxShadow]'
})

export class BoxShadowDirective {
  constructor(
   private el:ElementRef
  ) {
  }

  @Input() shadow: string = '';
  @Input() shadowX: number = 0;
  @Input() shadowY : number = 0;
  @Input() shadowBlur : number = 1;
  @Input() stretching : number = 1;
  @Input() color : string = '#000';
  

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.boxShadow = ` ${this.shadow} ${this.shadowX}px ${this.shadowY}px ${this.shadowBlur}px ${this.stretching}px ${this.color}`;
  }

  @HostListener('mouseleave') onMouseleave() {
    this.el.nativeElement.style.boxShadow = 'none';
  }

}