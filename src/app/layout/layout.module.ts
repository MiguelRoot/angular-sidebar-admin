import { NgModule } from '@angular/core';
import { HoverWrapDirective } from './hover-menu.directive';
import { ToolbarComponent } from './toolbar/toolbar.component';

@NgModule({
  declarations: [HoverWrapDirective, ToolbarComponent],
  imports: [],
  exports: [HoverWrapDirective],
})
export class LayoutModule {}
