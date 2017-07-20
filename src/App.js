import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    books: [],
    shelves: [{title: 'Reading', books: []}, {title: 'Read', books: []}, {title: 'Want to Read', books: []}]
  }

  sortBooks = (books) => {
    let updatedShelves = this.state.shelves
    let reading = books.filter((book) => {
      return book.shelf === "currentlyReading"
    })
    updatedShelves[0].books = reading

    let read = books.filter((book) => {
      return book.shelf === "read"
    })
    updatedShelves[1].books = read

    let toRead = books.filter((book) => {
      return book.shelf === "wantToRead"
    })
    updatedShelves[2].books = toRead

    return updatedShelves
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      this.setState({ shelves: this.sortBooks(books) })
    })
  }

  render() {
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Route exact path='/' render={() => (
            <Shelf
              shelves={this.state.shelves}
            />
          )}/>
          <Route path='/search' render={() => (
            <Search
              books={this.state.books}
            />
          )}/>
        </div>
      </div>
    );
  }
}

export default BooksApp
