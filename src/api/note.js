import request from '../utils/axios'

export function listNotes(noteType, chapterId) {
  return request.get(`/notes/${noteType}/${chapterId}`);
}

export function listUserNotes() {
  return request.get(`/notes/user`);
}

export function uploadNote(params) {
  return request.post('/notes', params);
}

export function updateNote(params) {
  return request.put(`/notes/${params.id}`, params);
}

export function deleteNoteById(id) {
  return request.delete(`/notes/${id}`);
}