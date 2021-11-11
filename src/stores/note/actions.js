import * as types from './types';

/**
 * Spinner
 * @param name
 * @param value
 * @returns {{type: string, payload: *}}
 */
export function spinner(name, value) {
  return {
    type: types.SPINNER,
    payload: {name, value}
  };
}

/**
 * Fetch notes
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function fetchNotes(payload = {}) {
  return {
    type: types.FETCH_NOTES,
    payload
  };
}

/**
 * Fetch single note
 * @param id
 * @param onSuccess
 * @returns {{type: string, payload: *}}
 */
export function fetchSingleNote(id, onSuccess) {
  return {
    type: types.FETCH_SINGLE_NOTE,
    payload: {id, onSuccess}
  };
}

/**
 * Fetch note initial details
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export const fetchNoteInitialDetails = payload => ({
  type: types.FETCH_INITIAL_DETAILS,
  payload
});

/**
 * Add note
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function addNote(payload = {}) {
  return {
    type: types.ADD_NOTE,
    payload
  };
}

/**
 * Update note
 * @param payload
 * @returns {{type: string, payload: *}}
 */
export function updateNote(payload = {}) {
  return {
    type: types.UPDATE_NOTE,
    payload
  };
}

/**
 * Remove note
 * @param id
 * @returns {{type: string, payload: *}}
 */
export function removeNote(id) {
  return {
    type: types.REMOVE_NOTE,
    payload: {id}
  };
}
