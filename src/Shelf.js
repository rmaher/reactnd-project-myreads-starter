import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Books from './Books'

class Shelf extends Component {
  static PropTypes = {
    shelves: PropTypes.array.isRequired,
  }

  render() {
    const { shelves } = this.props
    console.log(shelves)

    return (
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            {shelves.map((shelf) => (
            <div key={shelf.title}>
              <h2 className="bookshelf-title">{shelf.title}</h2>
              <Books books={shelf.books} />
            </div>
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default Shelf
