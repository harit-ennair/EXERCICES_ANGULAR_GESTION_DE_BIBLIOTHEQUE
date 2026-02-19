import { Component, signal, computed, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';
import { BookService } from '../../core/service/book-service';

@Component({
  selector: 'app-book-list',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {

  private BooksService = inject(BookService)

  books = signal([
    { id: 1 , title: 'Clean Code', available: true },
    { id: 2 , title: '1984', available: false },
    { id: 3 , title: 'Dune', available: true },
    { id: 4 , title: 'The Lord of the Rings', available: false },
    { id: 5 , title: 'The Pragmatic Programmer', available: true },
  ]);

  search = signal('');

  booksFind = computed(()=>{

    return this.books().filter( book =>{
      return book.title.toLowerCase().includes(this.search().toLowerCase())
    })

  })

  changeAvailablty(books : any){
    books.available = !books.available
  }

  books$ = this.BooksService.getBooks()


}
