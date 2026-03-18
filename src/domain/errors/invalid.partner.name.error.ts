export class InvalidPartnerNameError extends Error {
  constructor() {
    super("Partner name is required");
    this.name = "InvalidPartnerNameError";
  }
}