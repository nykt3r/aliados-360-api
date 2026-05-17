import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GetContactsByPartnerUseCase } from "../../../../src/application/useCases/contacts/getContactsByPartner.usecase";
import { IContactRepository } from "../../../../src/domain/interfaces/repositories/contact.repository.interface";
import { IPartnerRepository } from "../../../../src/domain/interfaces/repositories/partner.repository.interface";
import { Contact } from "../../../../src/domain/entities/contact.entity";
import { Partner } from "../../../../src/domain/entities/partner.entity";
import { UniqueId } from "../../../../src/domain/valueObjects/uniqueId.vo";
import { Email } from "../../../../src/domain/valueObjects/email.vo";
import { GetContactsByPartnerRequestDTO, GetContactsByPartnerResponseDTO } from "../../../../src/application/dto/contacts/getContactsByPartner.dto";

describe('GetContactsByPartner Use Case', () => {

    let contactRepository: IContactRepository;
    let partnerRepository: IPartnerRepository;
    let useCase: GetContactsByPartnerUseCase;

    beforeEach(() => {
        contactRepository = {
            save: vi.fn(),
            findByPartnerId: vi.fn(),
        };
        partnerRepository = {
            save: vi.fn(),
            findById: vi.fn(),
            findAll: vi.fn(),
            update: vi.fn(),
        };
        useCase = new GetContactsByPartnerUseCase(contactRepository, partnerRepository);
    });

    //Success case of getting contacts by partner id
    it('should return contacts by partner id', async () => {
        const partner = new Partner(new UniqueId("partner-id"), "Ubuntu", true);
        const contacts = [new Contact(new UniqueId("contact-1"), "Juan Perez", new Email("juan@test.com"), "Manager", new UniqueId("partner-id")),
        new Contact(new UniqueId("contact-2"), "Maria Lopez", new Email("maria@test.com"), "Supervisor", new UniqueId("partner-id"))];

        partnerRepository.findById = vi.fn().mockResolvedValue(partner);
        contactRepository.findByPartnerId = vi.fn().mockResolvedValue(contacts);

        const request: GetContactsByPartnerRequestDTO = { partnerId: "partner-id" };
        const result: GetContactsByPartnerResponseDTO[] = await useCase.execute(request);
       
        expect(result).toBeDefined();
        expect(result).toEqual([
            {
                id: "contact-1",
                name: "Juan Perez",
                email: "juan@test.com",
                role: "Manager",
                partnerId: "partner-id"
            },
            {
                id: "contact-2",
                name: "Maria Lopez",
                email: "maria@test.com",
                role: "Supervisor",
                partnerId: "partner-id"
            }
        ]);
        expect(partnerRepository.findById).toHaveBeenCalledTimes(1);
        expect(partnerRepository.findById).toHaveBeenCalledWith("partner-id");
        expect(contactRepository.findByPartnerId).toHaveBeenCalledTimes(1);
        expect(contactRepository.findByPartnerId).toHaveBeenCalledWith("partner-id");
    });

    //Error case of getting contacts by partner id when partner does not exist
    it('should throw an error if partner does not exist', async () => {
        partnerRepository.findById = vi.fn().mockResolvedValue(null);

        const request: GetContactsByPartnerRequestDTO = { partnerId: "missing-id" };

        const act = () => useCase.execute(request);

        await expect(act).rejects.toThrowError("Partner not found");
        expect(partnerRepository.findById).toHaveBeenCalledTimes(1);
        expect(partnerRepository.findById).toHaveBeenCalledWith("missing-id");
        expect(contactRepository.findByPartnerId).toHaveBeenCalledTimes(0);
        expect(contactRepository.findByPartnerId).not.toHaveBeenCalled();
    });

    //Error case of getting contacts by partner id that has no contacts
    it('should return an empty array if partner has no contacts', async () => {
        const partner = new Partner(new UniqueId("partner-id"), "Ubuntu", true);
        partnerRepository.findById = vi.fn().mockResolvedValue(partner);
        contactRepository.findByPartnerId = vi.fn().mockResolvedValue([]);

        const request: GetContactsByPartnerRequestDTO = { partnerId: "partner-id" };
        const result: GetContactsByPartnerResponseDTO[] = await useCase.execute(request);

        expect(result).toBeDefined();
        expect(result).toEqual([]);
        expect(partnerRepository.findById).toHaveBeenCalledTimes(1);
        expect(partnerRepository.findById).toHaveBeenCalledWith("partner-id");
        expect(contactRepository.findByPartnerId).toHaveBeenCalledTimes(1);
        expect(contactRepository.findByPartnerId).toHaveBeenCalledWith("partner-id");
    });

    //Error case of getting contacts by partner id when an unexpected error occurs
    it('should throw an error when getting contacts fails', async () => {
        const partner = new Partner(new UniqueId("partner-id"), "Ubuntu", true);
        partnerRepository.findById = vi.fn().mockResolvedValue(partner);
        contactRepository.findByPartnerId = vi.fn().mockResolvedValue(null);

        const request: GetContactsByPartnerRequestDTO = { partnerId: "partner-id" };

        const act = () => useCase.execute(request);

        await expect(act).rejects.toThrowError("Error getting Contacts");
        expect(partnerRepository.findById).toHaveBeenCalledTimes(1);
        expect(contactRepository.findByPartnerId).toHaveBeenCalledTimes(1);
    });

});