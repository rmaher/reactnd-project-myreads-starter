import React from 'react'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './Shelf'
import Search from './Search'

class BooksApp extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
    none: [],
    shelf: {}
  }

  sortBooks = () => {
    BooksAPI.getAll().then((data) => {
      this.setState({ currentlyReading: data.filter((book) => {
        return book.shelf === 'currentlyReading'})
      })
      this.setState({ wantToRead: data.filter((book) => {
        return book.shelf === 'wantToRead'})
      })
      this.setState({ read: data.filter((book) => {
        return book.shelf === 'read'})
      })
      // this.setState({ none: data.filter((book) => {
      //   return book.shelf === 'none'})
      // })


      if (Object.keys(this.state.shelf).length === 0) {
        this.setState({
          shelf: {
            "currentlyReading": this.state.currentlyReading.map((book) => {return book.id}),
            "wantToRead": this.state.wantToRead.map((book) => {return book.id}),
            "read": this.state.read.map((book) => {return book.id})
          }})
      }
    })
  }

  changeShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((data) => {
      this.setState({ shelf: data })
      this.sortBooks()
    })
  }

  componentDidMount() {
    this.sortBooks()
  }

  render() {
    const { currentlyReading, wantToRead, read } = this.state
    return (
      <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <Route exact path='/' render={() => (
            <div>
              <Shelf title="Currently Reading" shelf="currentlyReading" books={currentlyReading} changeShelf={this.changeShelf} />
              <Shelf title="Read" shelf="read" books={read} changeShelf={this.changeShelf} />
              <Shelf title="Want to Read" shelf="wantToRead" books={wantToRead} changeShelf={this.changeShelf} />
            </div>
          )}/>
          <Route path='/search' render={() => (
            <Search changeShelf={this.changeShelf} shelf={this.shelf}/>
          )}/>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BooksApp
