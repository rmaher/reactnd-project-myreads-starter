import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Changer from './Changer'

class Shelf extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
  }

  render() {
    const { books } = this.props

    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                  <Changer />
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default Shelf
