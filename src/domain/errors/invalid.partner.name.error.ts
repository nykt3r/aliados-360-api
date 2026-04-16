import { BadRequestError } from "../../shared/errors/app.error";

export class InvalidPartnerNameError extends BadRequestError {
  constructor() {
    super("Partner name is required");
    this.name = "InvalidPartnerNameError";
  }
}
