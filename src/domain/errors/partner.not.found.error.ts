export class PartnerNotFoundError extends Error {
  constructor() {
    super("Partner not found");
    this.name = "PartnerNotFoundError";
  }
}