import { Injectable } from '@angular/core';
import { ID, EntityStore, StoreConfig, EntityState } from '@datorama/akita';
import { ItemVM } from '../models/books';

export interface BookState extends EntityState<ItemVM, string> {
  areBooksLoaded: boolean;
}

export function createInitialState(): BookState {
  return {
      areBooksLoaded: false
  };
}

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'books' })
export class BookStore extends EntityStore<BookState> {

    constructor() {
        super(createInitialState());
    }

    // tslint:disable-next-line: typedef
    loadBooks(books: ItemVM[], areBooksLoaded: boolean) {
      this.set(books);
      this.update(state => ({
        ...state,
        areBooksLoaded
      }));
    }
}
