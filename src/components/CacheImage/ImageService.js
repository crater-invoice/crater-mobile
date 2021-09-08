// @flow
import { isEmpty } from '@/constants';

export const IS_UNDER_PROCESSING = 'IS_UNDER_PROCESSING';

class ImageService {
    images: Array<any>;

    constructor() {
        this.images = [];
    }

    addImage = name => {
        try {
            const isAlreadyExists = this.images.find(
                imgName => imgName === name
            );

            if (isAlreadyExists) {
                return;
            }

            this.images.push(name);
        } catch (e) {}
    };

    isUnderProcess = name => {
        try {
            if (isEmpty(this.images)) {
                return false;
            }

            for (const imgName of this.images) {
                if (imgName === name) {
                    return true;
                }
            }
        } catch (e) {
            return true;
        }

        return false;
    };

    removeImage = name => {
        try {
            this.images = this.images.filter(imgName => imgName !== name);
        } catch (e) {}
    };
}

export const CacheImageService = new ImageService();
