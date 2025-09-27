import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

export default function BookCard({ book }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{book.title}</Typography>
        <Typography variant="body2" color="textSecondary">
          Autor: {book.author_name ? book.author_name.join(', ') : 'Desconhecido'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Ano: {book.first_publish_year || 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  )
}