import { Component, inject } from '@angular/core';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-logobar',
  templateUrl: './logobar.component.html',
  styleUrl: './logobar.component.scss',
})
export class LogobarComponent {
  layoutService = inject(LayoutService);
  showTextMenu = true;

  ngOnInit() {
    this.layoutService.getSidebarState().subscribe(() => {
      this.showTextMenu = this.layoutService.getTextMenuShow();
    });
  }
}
