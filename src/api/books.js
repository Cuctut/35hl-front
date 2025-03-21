import request from '../utils/axios'

export function fetchDirectories() {
  return request.get('/books/directory');
}

export function fetchBooks() {
  return request.get('/books/books');
}