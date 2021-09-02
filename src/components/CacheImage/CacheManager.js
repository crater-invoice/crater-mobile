import * as _ from 'lodash';
import * as FileSystem from 'expo-file-system';
import { hasValue, isEmpty } from '@/constants';
import { CacheImageService, IS_UNDER_PROCESSING } from './ImageService';

export const BASE_DIR = `${FileSystem.cacheDirectory}crater-invoice-images/`;

export class CacheEntry {
    uri: string;

    constructor(uri: string) {
        this.uri = uri;
    }

    async getPath(imageName, _isMounted): Promise<string | undefined> {
        const { uri } = this;

        try {
            const {
                path,
                exists,
                imageIsSame,
                isUnderProcess
            } = await getCacheEntry(imageName);

            if (!_isMounted) return undefined;

            if (isUnderProcess) return IS_UNDER_PROCESSING;

            if (imageIsSame && exists) {
                return path;
            }

            return await downloadImagePath(uri, path, imageName, _isMounted);
        } catch (error) {
            return undefined;
        }
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

        await FileSystem.deleteAsync(path, { idempotent: true });

        const result = await FileSystem.createDownloadResumable(uri, path, {
            cache: true,
            sessionType: 0
        }).downloadAsync();

        if (result?.status === 200) {
            filePath = result?.uri;
            await CacheImageService.removeImage(name);
        } else {
            await FileSystem.deleteAsync(path, { idempotent: true });
            await CacheImageService.removeImage(name);
        }
    } catch (e) {
        CacheImageService.removeImage(name);
    }

    return filePath;
};

export default class CacheManager {
    static entries: { [uri: string]: CacheEntry } = {};

    static get(uri: string): CacheEntry {
        if (!CacheManager.entries[uri]) {
            CacheManager.entries[uri] = new CacheEntry(uri);
        }
        return CacheManager.entries[uri];
    }
}

const getCacheEntry = async (
    imageName: string
): Promise<{
    exists: boolean,
    path: string,
    imageIsSame: boolean,
    isUnderProcess: boolean
}> => {
    const path: string = `${BASE_DIR}${imageName}`;

    let imageIsSame: boolean = true,
        exists: boolean = false,
        uri: string = null;

    try {
        const folderInfo = await FileSystem.getInfoAsync(BASE_DIR);
        if (!folderInfo?.exists) await FileSystem.makeDirectoryAsync(BASE_DIR);

        if (await CacheImageService.isUnderProcess(imageName)) {
            return { exists, path, imageIsSame, isUnderProcess: true };
        }

        const info = await FileSystem.getInfoAsync(path);
        exists = info?.exists;
        uri = info?.uri;

        if (exists) {
            const isChanged = isImageChange(uri, imageName);
            if (isChanged) imageIsSame = false;
        }
    } catch (e) {}

    return { exists, path, imageIsSame, isUnderProcess: false };
};

export const isImageChange = (uri: string, name: string) => {
    if (!uri) return false;

    if (!name) return false;

    if (uri.includes('http')) return false;

    const split = hasValue(uri) ? uri.split('/') : [];
    const urlImageName = !isEmpty(split)
        ? split?.[split?.length - 1]
        : null;

    if (!(urlImageName && name && urlImageName === name)) {
        return true;
    }

    return false;
};
