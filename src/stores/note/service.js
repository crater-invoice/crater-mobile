import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetch notes
 * @param q : queryString
 * @returns {*}
 */
export const fetchNotes = q => {
  return Request.get(`/notes?${queryString.stringify(q)}`);
};

/**
 * Fetch single note
 * @param id : note id
 * @returns {*}
 */
export const fetchSingleNote = id => {
  return Request.get(`/notes/${id}`);
};

/**
 * Add note
 * @param data
 * @returns {*}
 */
export const addNote = data => {
  return Request.post(`/notes`, data);
};

/**
 * Update note
 * @param id : note id
 * @param data
 * @returns {*}
 */
export const updateNote = (id, data) => {
  return Request.put(`/notes/${id}`, data);
};

/**
 * Remove note
 * @param id : note id
 * @returns {*}
 */
export const removeNote = id => {
  return Request.delete(`/notes/${id}`);
};
