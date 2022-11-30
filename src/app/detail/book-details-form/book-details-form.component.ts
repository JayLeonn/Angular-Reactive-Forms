import { HttpService } from './../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Book } from 'src/app/entities/book';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-details-form',
  templateUrl: './book-details-form.component.html',
  styleUrls: ['./book-details-form.component.css'],
})
export class BookDetailsFormComponent implements OnInit {
  bookDetailsForm: FormGroup;
  bookId: number;
  book: Book = new Book(0, 'New Book', 'Joonas', 10);

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private httpService: HttpService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.bookId = +params['id'];

      if (this.bookId !== 0) {
        this.book = this.httpService.getBook(this.bookId);
      }
    });

    this.bookDetailsForm = this.formBuilder.group({
      author: [this.book.author, Validators.required],
      title: [this.book.title, Validators.required],
      price: [this.book.price, Validators.max(50)],
    });
  }

  handleSubmit(): void {
    this.book.title = this.title;
    this.book.author = this.author;
    this.book.price = this.price;

    if (this.bookId !== 0) {
      this.httpService.updateBook(this.book);
    } else {
      this.httpService.createBook(this.book);
    }
    this.location.back();
  }

  //These getters are required if you do not want to use the deprecated method of combining two way binding + formcontrol
  get title(): string {
    return this.bookDetailsForm.get('title')!.value as string;
  }

  get author(): string {
    return this.bookDetailsForm.get('author')!.value as string;
  }

  get price(): number {
    return this.bookDetailsForm.get('price')!.value as number;
  }
}
