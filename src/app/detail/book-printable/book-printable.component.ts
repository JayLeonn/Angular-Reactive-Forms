import { HttpService } from './../../services/http.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/entities/book';

@Component({
  selector: 'app-book-printable',
  templateUrl: './book-printable.component.html',
  styleUrls: ['./book-printable.component.css'],
})
export class BookPrintableComponent implements OnInit {
  bookId: number;
  book: Book;

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.httpService.getBooks();
    this.route.parent!.params.subscribe((params) => {
      this.bookId = +params['id'];
      this.book = this.httpService.getBook(this.bookId);
    });
  }
}
