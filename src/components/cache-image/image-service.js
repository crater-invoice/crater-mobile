import {isEmpty} from '@/constants';
export const IS_UNDER_PROCESSING = 'IS_UNDER_PROCESSING';

class ImageService {
  images: Array<any>;

  constructor() {
    this.images = [];
  }

  addImage = name => {
    const isAlreadyExists = this.images.find(imgName => imgName === name);

    if (isAlreadyExists) {
      return;
    }

    this.images.push(name);
  };

  removeImage = name => {
    this.images = this.images.filter(imgName => imgName !== name);
  };

  isUnderProcess = name => {
    if (isEmpty(this.images)) {
      return false;
    }

    for (const imgName of this.images) {
      if (imgName === name) {
        return true;
      }
    }

    return false;
  };
}

export const CacheImageService = new ImageService();
