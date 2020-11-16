import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BookState, BookStore } from './book.store';


@Injectable({
  providedIn: 'root'
})
export class BookQuery extends QueryEntity<BookState> {

  selectAreBooksLoaded$ = this.select(state => {
    return state.areBooksLoaded;
  });

  constructor(protected store: BookStore) {
    super(store);
  }
}
