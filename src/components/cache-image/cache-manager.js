import * as _ from 'lodash';
import * as FileSystem from 'expo-file-system';
import {CacheImageService, IS_UNDER_PROCESSING} from './image-service';

export const BASE_DIR = `${FileSystem.cacheDirectory}/`;

export async function getPath(uri, imageName, _isMounted) {
  try {
    const {path, exists, isUnderProcess} = await getCacheEntry(imageName);

    if (!_isMounted) return undefined;

    if (isUnderProcess) return IS_UNDER_PROCESSING;

    if (exists) {
      return path;
    }

    return await downloadImagePath(uri, path, imageName, _isMounted);
  } catch (error) {
    return undefined;
  }
}

const downloadImagePath = async (
  uri: string,
  path: string,
  name: string,
  _isMounted: boolean
): Promise<string | undefined> => {
  if (!_isMounted) return undefined;

  let filePath = uri;

  try {
    await CacheImageService.addImage(name);
    const result = await FileSystem.createDownloadResumable(
      uri,
      path
    ).downloadAsync();

    if (result?.status === 200) {
      filePath = result?.uri;
    }
  } catch (e) {
  } finally {
    CacheImageService.removeImage(name);
  }

  return filePath;
};

const getCacheEntry = async (
  imageName: string
): Promise<{
  exists: boolean,
  path: string,
  isUnderProcess: boolean
}> => {
  const path: string = `${BASE_DIR}${imageName}`;
  let exists: boolean = false;

  if (await CacheImageService.isUnderProcess(imageName)) {
    return {exists, path, isUnderProcess: true};
  }

  const info = await FileSystem.getInfoAsync(path);
  exists = info?.exists;

  return {exists, path, isUnderProcess: false};
};
