import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BookStore } from '../store/book.store';
import { ItemVM } from '../models/books';


@Injectable()
export class BookService {

  http: HttpClient;
  store: BookStore;

  constructor(http: HttpClient, store: BookStore) {
    this.http = http;
    this.store = store;
  }


  getBooks(text: string): Observable<ItemVM[]> {
    // we get the book list from the google api and match the complex structure to our simpler one

    return this.http.get<any[]>('https://books.googleapis.com/books/v1/volumes?q=' + text)
      .pipe(map((resp: any) => resp.items.map(item => {
        {
          return {
            id: item.id,
            title: item.volumeInfo.title,
             // we check and assign a value if the row does not have an author
            author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'No author specified'
          };
        }
      })),
        tap(books => {
          this.store.loadBooks(books, true);
        }
        ));
  }

}
