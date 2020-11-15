import { EntityStore, EntityState } from '@datorama/akita';

import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { BookStore } from '../store/book.store';
import { BookItem, ItemVM } from '../models/books';


@Injectable()
export class BookService {

  http: HttpClient;

  store: BookStore;

  constructor(http: HttpClient, store: BookStore) {
    this.http = http;
    this.store = store;
  }

  /*getAllBooks(text: string): Observable<ItemVM[]> {
    return this.http.get<ItemVM[]>('https://books.googleapis.com/books/v1/volumes?q=' + text + '&maxResults=7').pipe(
      tap(books => {
        this.store.loadBooks(books, true);
      })
    );
  }*/

  getBooks(text: string): Observable<ItemVM[]> {
    console.log('get call:', 'https://books.googleapis.com/books/v1/volumes?q=' + text);
    return this.http.get<any[]>('https://books.googleapis.com/books/v1/volumes?q=' + text)
      .pipe(map((resp: any) => resp.items.map(item => {
        {
          return {
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors ? item.volumeInfo.authors[0] : 'No author specified'
          };
        }
      })),
        tap(books => {
          console.log('llamando a loadbooks');
          this.store.loadBooks(books, true);
        }
        ));
  }


  /*getAllBooks(text: string): Observable<BookItem[]> {
    return this.http.get<ItemVM[]>('https://books.googleapis.com/books/v1/volumes?q=' + text + '&maxResults=7').
      pipe(map((items: BookItem[]) => items.map(item => {
        {
          return {
            id: item.id,
            title: item.volumeInfo.title,
            author: item.volumeInfo.authors[0]
          };
        }
      })).pipe(
        tap(books => {
          this.store.loadBooks(books, true);
        })
      );
  }*/

}
