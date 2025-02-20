import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [
    RouterModule,
    CommonModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
  ],
  exports: [
    RouterModule,
    CommonModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class SharedModule {}
