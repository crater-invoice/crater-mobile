class RatingReview {
    isFirstInvoiceCreated: boolean;

    constructor() {
        this.isFirstInvoiceCreated = false;
    }

    toggleIsFirstInvoiceCreated = status =>
        (this.isFirstInvoiceCreated = status);
}

export const RatingReviewService = new RatingReview();
