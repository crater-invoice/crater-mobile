// @flow

class Services {
    isEmailSent: boolean;

    constructor() {
        this.isEmailSent = false;
    }

    toggleIsEmailSent = status => (this.isEmailSent = status);
}

const InvoiceServices = new Services();

export default InvoiceServices;
