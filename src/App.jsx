import React, { useContext } from 'react'
import { Container, Typography, Grid } from '@mui/material'
import SearchBar from './components/SearchBar'
import BookCard from './components/BookCard'
import { BooksContext } from './contexts/BooksContext'

export default function App() {
  const { state } = useContext(BooksContext)

  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Biblioteca Online
      </Typography>
      <SearchBar />
      <Grid container spacing={2} marginTop={2}>
        {state.books.map((book, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <BookCard book={book} />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}
