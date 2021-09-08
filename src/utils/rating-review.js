import * as StoreReview from 'expo-store-review';

export const openRatingReviewModal = async () => {
  try {
    const isAvailable = await StoreReview.isAvailableAsync();

    if (!isAvailable) {
      return;
    }

    StoreReview.requestReview();
  } catch (e) {}
};
