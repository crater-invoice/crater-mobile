class Services {
  isEmailSent: boolean;

  constructor() {
    this.isEmailSent = false;
  }

  toggleIsEmailSent = status => (this.isEmailSent = status);
}

const PaymentServices = new Services();

export default PaymentServices;
