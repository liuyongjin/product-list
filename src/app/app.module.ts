import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { appConfig } from './app.config';
import { BrowserModule } from '@angular/platform-browser';

import { ProductListComponent } from './pages/product-list/product-list.component';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent, ProductListComponent],
  imports: [BrowserModule, SharedModule],
  providers: [...appConfig.providers],
  bootstrap: [AppComponent],
})
export class AppModule {}
