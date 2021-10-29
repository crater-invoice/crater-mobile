import Request from 'utils/request';

/**
 * Fetch current user
 * @returns {*}
 */
export const fetchCurrentUser = () => {
  return Request.get({path: `me`});
};

/**
 * Update current user
 * @param body : params
 * @returns {*}
 */
export const updateCurrentUser = body => {
  return Request.put({path: `me`, body});
};

/**
 * Fetch user setting
 * @param keys
 * @returns {*}
 */
export const fetchUserSettings = keys => {
  return Request.get({
    path: `me/settings`,
    axiosProps: {params: {settings: keys}}
  });
};

/**
 * Update user setting
 * @param settings
 * @returns {*}
 */
export const updateUserSettings = settings => {
  return Request.put({path: `me/settings`, body: {settings}});
};

/**
 * Upload avatar
 * @param avatar
 * @returns {*}
 */
export const uploadAvatar = avatar => {
  return Request.post({
    path: `me/upload-avatar`,
    image: avatar,
    imageName: 'admin_avatar'
  });
};
