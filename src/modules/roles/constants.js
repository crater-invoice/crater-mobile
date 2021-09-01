export const SPINNER = 'roles/SPINNER';

export const ROLES_FORM = 'roles/ROLES_FORM';
export const CREATE_ROLE_FORM = 'roles/CREATE_ROLE_FORM';

export const FETCH_ROLES = 'roles/FETCH_ROLES';
export const FETCH_ROLES_SUCCESS = 'roles/FETCH_ROLES_SUCCESS';

export const FETCH_SINGLE_ROLE = 'roles/FETCH_SINGLE_ROLE';
export const FETCH_SINGLE_ROLE_SUCCESS = 'roles/FETCH_SINGLE_ROLE_SUCCESS';

export const FETCH_PERMISSIONS = 'roles/FETCH_PERMISSIONS';
export const FETCH_PERMISSIONS_SUCCESS = 'roles/FETCH_PERMISSIONS_SUCCESS';

export const ADD_ROLE = 'roles/ADD_ROLE';
export const ADD_ROLE_SUCCESS = 'roles/ADD_ROLE_SUCCESS';

export const UPDATE_ROLE = 'roles/UPDATE_ROLE';
export const UPDATE_ROLE_SUCCESS = 'roles/UPDATE_ROLE_SUCCESS';

export const REMOVE_ROLE = 'roles/REMOVE_ROLE';
export const REMOVE_ROLE_SUCCESS = 'roles/REMOVE_ROLE_SUCCESS';

export const UPDATE_PERMISSION = 'roles/UPDATE_PERMISSION';

export const getModalName = model =>
  model.substring(model.lastIndexOf('\\') + 1);
