import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true
})
export class ScrollAnimationDirective {
  @Input() direction: 'left' | 'right' | 'bottom' = 'right'; // Default to 'right'

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const element = this.el.nativeElement;
    const position = element.getBoundingClientRect().top;

    // Check if the element is in the viewport
    if (position < window.innerHeight - 200 && position > 0) {
      this.renderer.addClass(element, 'animate');
      this.renderer.removeClass(element, 'left');
      this.renderer.removeClass(element, 'right');
      this.renderer.removeClass(element, 'bottom');

      // Add the direction class based on the input
      this.renderer.addClass(element, this.direction);
    } else {
      this.renderer.removeClass(element, 'animate');
    }
  }

}
