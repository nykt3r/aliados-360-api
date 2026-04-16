import { NotFoundError } from "../../shared/errors/app.error";

export class PartnerNotFoundError extends NotFoundError {
  constructor() {
    super("Partner not found");
    this.name = "PartnerNotFoundError";
  }
}
