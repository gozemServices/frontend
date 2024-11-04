import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appScrollAnimation]',
  standalone: true
})
export class ScrollAnimationDirective {

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ){}

  @HostListener('window:scroll',[])
  onWindowScroll(){
    const element = this.el.nativeElement;
    const position = element.getBoundingClientRect.top();

    if(position < window.innerHeight - 100) {
      this.renderer.addClass(element,'animate');
    }else {
      this.renderer.removeClass(element,'animate');
    }
  }

}
