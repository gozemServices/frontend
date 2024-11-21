import { Component } from '@angular/core';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  styles: ``,
  template: `
    <div class="absolute w-screen h-screen top-0 left-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div class="w-16 h-16 border-4 border-t-4 border-gray-200 border-solid rounded-full animate-spin border-t-blue-500"></div>
    </div>
  `
})
export class LoadingComponent {

}
