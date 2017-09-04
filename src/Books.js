import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'

class Books extends Component {
  constructor(props) {
    super(props);
    if (!Array.isArray(props.book.authors)) {
      props.book.authors = []
    }
    if (!("imageLinks" in props.book)) {
      props.book.imageLinks = {}
      props.book.imageLinks.thumbnail = "http://via.placeholder.com/128x193?text=NO-IMAGE"
    }
    if (props.shelf) {
      props.book.shelf = this.handleShelf(props.book.id, props.shelf)
    }

    this.state = {
      book: props.book
    }
  }

  static propTypes = {
    book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired,
    shelf: PropTypes.object
  }

  handleChange = (event) => {
    this.props.changeShelf(this.props.book, event.target.value)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.shelf !== nextProps.shelf) {
      const actualShelf = this.state.book.shelf
      const posibleNewShelf = this.handleShelf(this.state.book.id, nextProps.shelf)
      if (actualShelf !== posibleNewShelf){
        let newBook = this.state.book
        newBook.shelf = posibleNewShelf
        this.setState({
          book: newBook
        })
      }
    }
  }

  handleShelf = (bookID, shelf) => {
    if (shelf.currentlyReading.indexOf(bookID) >= 0) {
      return "currentlyReading"
    }
    if (shelf.wantToRead.indexOf(bookID) >= 0) {
      return "wantToRead"
    }
    if (shelf.read.indexOf(bookID) >= 0) {
      return "read"
    }
    return 'none'
  }

  render() {
    const { book } = this.state

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
            <div className="book-shelf-changer">
              <select value={book.shelf} onChange={this.handleChange}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
        <div className="book-title">{book.title}</div>
          {
            book.authors.map((author, index) => (
              <div key={index} className="book-authors">{author}</div>
          ))}
      </div>
    )
  }
}

export default Books
