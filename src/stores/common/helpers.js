import {store} from '..';

export const SUPER_ADMIN = 'super admin';

export const isSuperAdmin = () => {
  const role = store?.getState?.()?.common?.user?.role;
  return role === SUPER_ADMIN;
};
