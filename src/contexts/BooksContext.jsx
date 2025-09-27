import React, { createContext, useReducer } from 'react'
import axios from 'axios'

const initialState = {
  books: [],
  loading: false,
  error: null
}

function reducer(state, action) {
  switch (action.type) {
    case 'SEARCH_BOOKS_REQUEST':
      return { ...state, loading: true, error: null }
    case 'SEARCH_BOOKS_SUCCESS':
      return { ...state, loading: false, books: action.payload }
    case 'SEARCH_BOOKS_FAILURE':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export const BooksContext = createContext()

export function BooksProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const searchBooks = async (query) => {
    dispatch({ type: 'SEARCH_BOOKS_REQUEST' })
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${query}`)
      dispatch({ type: 'SEARCH_BOOKS_SUCCESS', payload: response.data.docs })
    } catch (error) {
      dispatch({ type: 'SEARCH_BOOKS_FAILURE', payload: error.message })
    }
  }

  return (
    <BooksContext.Provider value={{ state, searchBooks }}>
      {children}
    </BooksContext.Provider>
  )
}
