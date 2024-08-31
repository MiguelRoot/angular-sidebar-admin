import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, first, of } from 'rxjs';
@Component({
  selector: 'app-icon',
  template: '',
  styleUrl: './icon.component.scss',
})
export class IconComponent {
  @Input() name: string = '';
  @Input() size: string = '';

  constructor(
    private http: HttpClient,
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.loadIcon();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['name']) {
      this.loadIcon();
    }
  }

  loadIcon(): void {
    const iconUrl = `assets/icons/${this.name}.svg`;
    this.http
      .get(iconUrl, { responseType: 'text' })
      .pipe(
        first(),
        catchError(() => {
          // En caso de error, devuelve un SVG default
          return of(`
            <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clip-path="url(#clip0_6933_2)">
              <path d="M750 85.3525L714.647 50L50 714.647L85.3525 750L135.353 700H650C663.255 699.982 675.963 694.709 685.336 685.336C694.709 675.963 699.982 663.255 700 650V135.353L750 85.3525ZM650 650H185.353L380.175 455.175L439.645 514.642C449.022 524.019 461.739 529.287 475 529.287C488.261 529.287 500.978 524.019 510.355 514.642L550 475L650 574.932V650ZM650 504.205L585.355 439.558C575.978 430.181 563.261 424.913 550 424.913C536.739 424.913 524.022 430.181 514.645 439.558L475 479.205L415.575 419.777L650 185.353V504.205Z" fill="currentColor"/>
              <path d="M150 550V475L275 350.085L309.332 384.418L344.73 349.018L310.355 314.643C300.978 305.266 288.261 299.998 275 299.998C261.739 299.998 249.022 305.266 239.645 314.643L150 404.29V150H550V100H150C136.743 100.013 124.033 105.285 114.659 114.659C105.285 124.033 100.013 136.743 100 150V550H150Z" fill="currentColor"/>
              </g>
            </svg>
          `);
        })
      )
      .subscribe((svg) => {
        this.el.nativeElement.innerHTML = svg;
        const svgElement = this.el.nativeElement.querySelector('svg');
        if (svgElement) {
          this.applyContainerStyles(svgElement);
          this.applySizeStyles(svgElement);
        }
      });
  }

  applyContainerStyles(svgElement: SVGElement): void {
    // Ensure the SVG inherits the size from the component's container
    this.renderer.setStyle(svgElement, 'width', '100%');
    this.renderer.setStyle(svgElement, 'height', '100%');
  }

  applySizeStyles(svgElement: SVGElement): void {
    let width, height;
    const sizeAsNumber = Number(this.size);
    if (!isNaN(sizeAsNumber)) {
      width = `${this.size}px`;
      height = `${this.size}px`;
    } else {
      switch (this.size) {
        case 'small':
          width = '16px';
          height = '16px';
          break;
        case 'large':
          width = '48px';
          height = '48px';
          break;
        default:
          width = height = '24px'; // Default size
      }
    }
    this.renderer.setStyle(this.el.nativeElement, 'width', width);
    this.renderer.setStyle(this.el.nativeElement, 'height', height);
  }
}
