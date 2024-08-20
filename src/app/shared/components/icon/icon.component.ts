import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs';
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

  loadIcon(): void {
    const iconUrl = `assets/icons/${this.name}.svg`;
    this.http
      .get(iconUrl, { responseType: 'text' })
      .pipe(first())
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
