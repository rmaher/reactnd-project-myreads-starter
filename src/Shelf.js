import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Books from './Books'

class Shelf extends Component {
  static PropTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    changeShelf: PropTypes.func.isRequired,
  }

  render() {
    const { title, changeShelf, books } = this.props
  //  const { } = this.state

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {
              books.map((book) => (
                <li key={book.id}>
                  <Books book={book} changeShelf={ changeShelf } />
                </li>))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf
