// @flow

class Services {
    isEmailSent: boolean;

    constructor() {
        this.isEmailSent = false;
    }

    toggleIsEmailSent = status => (this.isEmailSent = status);
}

const EstimateServices = new Services();

export default EstimateServices;
