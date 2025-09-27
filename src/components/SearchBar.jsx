import React, { useState, useContext } from 'react'
import { TextField, Button, Box } from '@mui/material'
import { BooksContext } from '../contexts/BooksContext'

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const { searchBooks, state } = useContext(BooksContext)

  const handleSearch = () => {
    if (query.trim() === '') {
      alert('Digite o nome de um livro!')
      return
    }
    searchBooks(query)
  } 
 
  return (
    <Box display="flex" gap={2} justifyContent="center" marginTop={2}>
      <TextField
        label="Buscar livro"
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch} disabled={state.loading}>
        {state.loading ? 'Buscando...' : 'Buscar'}
      </Button>
    </Box>
  )
}
