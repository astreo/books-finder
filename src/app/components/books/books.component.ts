import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BooksService } from '../../services/books.service';
import { BookItem } from '../../models/books';

//
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
//

declare interface ItemVM {
  id: string;
  title: string;
  author: string;
}

const ELEMENT_DATA: ItemVM[] = null;

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.sass']
})
export class BooksComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'title', 'author'];
  // dataSource: MatTableDataSource<ItemVM>;
  dataSource = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  loading = false;
  bookItems: ItemVM[];
  subscription = new Subscription();

  mainSearchText = '';

  constructor(private booksService: BooksService) {
    // this.dataSource = new MatTableDataSource(this.bookItems);
  }

  ngOnInit(): void {
    // this.dataSource.sort = this.sort;
    // this.getList();
  }

  ngAfterViewInit(): void {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event): void {
    console.log('hola');
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getList(mainSearchText: string): void {
    console.log('entro');
    this.loading = true;
    this.subscription = this.booksService.getItems(mainSearchText)
    .pipe(map((items: BookItem[]) => items.map(item => {
      {
        return {
          id: item.id,
          title: item.volumeInfo.title,
          author: item.volumeInfo.authors[0]
        };
      }
    }))).subscribe(
      result => {
        // if (permisos.length === 0) return;

        this.bookItems = result;
        console.log('reducido:', this.bookItems);
        this.loading = false;
        // this.dataSource = new MatTableDataSource(this.bookItems);
        this.dataSource.data = this.bookItems;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      (/*error*/) => { }
    );
  }

}
