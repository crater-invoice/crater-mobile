import Request from 'utils/request';

/**
 * Fetch current user
 * @returns {*}
 */
export const fetchCurrentUser = () => {
  return Request.get(`/me`);
};

/**
 * Update current user
 * @param data
 * @returns {*}
 */
export const updateCurrentUser = data => {
  return Request.put(`/me`, data);
};

/**
 * Fetch user setting
 * @param keys
 * @returns {*}
 */
export const fetchUserSettings = keys => {
  return Request.get(`/me/settings`, {axiosProps: {params: {settings: keys}}});
};

/**
 * Update user setting
 * @param settings
 * @returns {*}
 */
export const updateUserSettings = settings => {
  return Request.put(`/me/settings`, {settings});
};

/**
 * Upload avatar
 * @param avatar
 * @returns {*}
 */
export const uploadAvatar = avatar => {
  return Request.post(
    `/me/upload-avatar`,
    {},
    {image: avatar, imageName: 'avatar'}
  );
};
