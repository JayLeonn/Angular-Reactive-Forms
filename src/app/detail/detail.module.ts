import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookPrintableComponent } from './book-printable/book-printable.component';
import { DetailContainerComponent } from './detail-container/detail-container.component';
import { BookdetailsComponent } from './book-details/book-details.component';
import { RouterModule } from '@angular/router';
import { BookDetailsFormComponent } from './book-details-form/book-details-form.component';

const detailRoutes = [
  {
    path: 'book/:id',
    component: DetailContainerComponent,
    children: [
      { path: '', component: BookDetailsFormComponent }, // localhost:4200/book/:id
      { path: 'no-validation', component: BookdetailsComponent }, // localhost:4200/book/:id/no-validation
      { path: 'printable', component: BookPrintableComponent }, // localhost:4200/book/:id/printable
    ],
  },
];

@NgModule({
  declarations: [
    BookPrintableComponent,
    DetailContainerComponent,
    BookdetailsComponent,
    BookDetailsFormComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(detailRoutes),
    ReactiveFormsModule,
  ],
})
export class DetailModule {}
