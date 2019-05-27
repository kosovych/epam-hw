import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { BoxShadowDirective } from './directives/box-shadow.directive';
import { DecodeCategory } from './pipes/decode-category.pipe';


@NgModule({
  declarations: [
    HeaderComponent,
    BoxShadowDirective,
    DecodeCategory
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    HeaderComponent,
    BoxShadowDirective,
    DecodeCategory
  ],
})
export class SharedModule { }
