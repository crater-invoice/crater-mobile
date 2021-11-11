import Request from 'utils/request';
import * as queryString from 'query-string';

/**
 * Fetch notes
 * @param q : queryString
 * @returns {*}
 */
export const fetchNotes = q => {
  return Request.get({path: `notes?${queryString.stringify(q)}`});
};

/**
 * Fetch single note
 * @param id : note id
 * @returns {*}
 */
export const fetchSingleNote = id => {
  return Request.get({path: `notes/${id}`});
};

/**
 * Add note
 * @param body : params
 * @returns {*}
 */
export const addNote = body => {
  return Request.post({path: `notes`, body});
};

/**
 * Update note
 * @param id : note id
 * @param body : params
 * @returns {*}
 */
export const updateNote = (id, body) => {
  return Request.put({path: `notes/${id}`, body});
};

/**
 * Remove note
 * @param id : note id
 * @returns {*}
 */
export const removeNote = id => {
  return Request.delete({path: `notes/${id}`});
};
