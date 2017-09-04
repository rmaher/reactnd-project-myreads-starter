import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import Shelf from './Shelf'

class Search extends Component {
  constructor(props) {
    super(props)

    books: props.books
  }

  static propTypes = {
    changeShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    books: []
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.query !== this.state.query) {
      if (this.state.query === '') {
        this.setState({books: []})
      }
      else {
        this.search(this.state.query)
      }
    }
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  search = (query) => {
    BooksAPI.search(query).then(data => {
      let updatedData = []
      if (Array.isArray(data)) {
        data.forEach((element) => {
          element.shelf ? element.shelf : element.shelf = 'none'
          updatedData.push(element)
        })
        this.setState({books: updatedData})
      }
      else {
        this.setState({books: []})
      }
    })
  }

  render() {
    const { query, books } = this.state
    const { changeShelf } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
          </div>
        </div>
        <Shelf books={books} changeShelf={changeShelf} />
      </div>
    )
  }
}

export default Search
