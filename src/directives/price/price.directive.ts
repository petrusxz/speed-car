import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: 'ion-input[price]'
})
export class PriceDirective {

  constructor(public element: ElementRef) { }

  ionViewDidEnter(): void {
    this.applyMask();
  }

  @HostListener('ionBlur', ['$event.target'])
  onblur(input: HTMLTextAreaElement): void {
    this.applyMask();
  }

  @HostListener('ionFocus', ['$event.target'])
  onfocus(input: HTMLTextAreaElement): void {
    this.applyMask();
  }

  @HostListener('keyup', ['$event.target'])
  onkeyup(input: HTMLTextAreaElement): void {
    this.applyMask();
  }

  applyMask(): void {
    let input = this.element.nativeElement.querySelector('input');

    if (input) {
      let x = input.value.replace(/\D/g, '');

      switch (x.length) {
        case 3:
          x = x.match(/(\d{0,1})(\d{0,2})/);
          input.value = !x[2] ? x[1] : `${x[1]},${x[2]}`;
          break;
        case 4:
          x = x.match(/(\d{0,2})(\d{0,2})/);
          input.value = !x[2] ? x[1] : `${x[1]},${x[2]}`;
          break;
        case 5:
          x = x.match(/(\d{0,3})(\d{0,2})/);
          input.value = `${x[1]},${x[2]}`;
          break;
        case 6:
          x = x.match(/(\d{0,1})(\d{0,3})(\d{0,2})/);
          input.value = `${x[1]}.${x[2]},${x[3]}`;
          break;;
        default:
          input.value = x
          break;
      }
    }
  }
}