// @flow

class Services {
    isEmailSent: boolean;
    isFirstInvoiceCreated: boolean;

    constructor() {
        this.isEmailSent = false;
        this.isFirstInvoiceCreated = false;
    }

    toggleIsEmailSent = status => (this.isEmailSent = status);
    toggleIsFirstInvoiceCreated = status =>
        (this.isFirstInvoiceCreated = status);
}

const InvoiceServices = new Services();

export default InvoiceServices;
