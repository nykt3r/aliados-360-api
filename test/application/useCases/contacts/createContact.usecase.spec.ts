import { beforeEach, describe, expect, it, vi} from 'vitest';
import { CreateContactUseCase } from "../../../../src/application/useCases/contacts/createContact.usecase";
import { IContactRepository } from "../../../../src/domain/interfaces/repositories/contact.repository.interface";
import { IPartnerRepository } from "../../../../src/domain/interfaces/repositories/partner.repository.interface";
import { CreateContactRequestDTO, CreateContactResponseDTO } from "../../../../src/application/dto/contacts/createContact.dto";

describe('CreateContact Use Case', () => {

    let contactRepository: IContactRepository;
    let partnerRepository: IPartnerRepository;
    let useCase: CreateContactUseCase;

    beforeEach(() => {
        contactRepository = {
            save: vi.fn(),
            findByPartnerId: vi.fn(),
        }
        partnerRepository = {
            save: vi.fn(),
            findById: vi.fn(),
            findAll: vi.fn(),
            update: vi.fn(),
        }
        useCase = new CreateContactUseCase(contactRepository, partnerRepository)
    });

    //success case of creating a contact
    it('should create and save a contact', async () => {
        partnerRepository.findById = vi.fn().mockResolvedValue({ getId: () => "partner-id" });
        contactRepository.findByPartnerId = vi.fn().mockResolvedValue([]);
        contactRepository.save = vi.fn().mockImplementation(async (contact) => contact);

        const request: CreateContactRequestDTO = { 
            id: "contact-id",
            name: "John Perez",
            email: "john.perez@test.com",
            role: "Manager",
            partnerId: "partner-id"
        };

        const result: CreateContactResponseDTO = await useCase.execute(request);
       
        expect(result).toBeDefined();
        expect(result).toEqual({
            id: "contact-id",
            name: "John Perez",
            email: "john.perez@test.com",
            role: "Manager",
            partnerId: "partner-id"
        });
        expect(partnerRepository.findById).toHaveBeenCalledTimes(1)
        expect(contactRepository.findByPartnerId).toHaveBeenCalledTimes(1);
        expect(contactRepository.save).toHaveBeenCalledWith(
            expect.objectContaining({
                getId: expect.any(Function),
                getName: expect.any(Function),
                getEmail: expect.any(Function),
                getRole: expect.any(Function),
                getPartnerId: expect.any(Function),
            })
        );
    });

    //Error case of creating a contact when partner does not exist
    it('should throw an error if partner does not exist', async () => {
        partnerRepository.findById = vi.fn().mockResolvedValue(null);

        const request: CreateContactRequestDTO = { 
            id: "contact-id",
            name: "John Perez",
            email: "john.perez@test.com",
            role: "Manager",
            partnerId: "partner-id"
        };

        await expect(useCase.execute(request)).rejects.toThrow('Partner not found');
        expect(contactRepository.findByPartnerId).not.toHaveBeenCalled();
        expect(contactRepository.save).not.toHaveBeenCalled();
    });

    //Error case of creating a contact when a contact with the same email already exists for the partner
    it('should throw an error if a contact with the same email already exists for the partner', async () => {
        partnerRepository.findById = vi.fn().mockResolvedValue({ getId: () => "partner-id" });
        contactRepository.findByPartnerId = vi.fn().mockResolvedValue([
            { getEmail: () => "john.perez@test.com" }
        ]);

        const request: CreateContactRequestDTO = { 
            id: "contact-id",
            name: "John Perez",
            email: "john.perez@test.com",
            role: "Manager",
            partnerId: "partner-id"
        };

        await expect(useCase.execute(request)).rejects.toThrow('Contact e-mail already exists for this partner');
        expect(contactRepository.save).not.toHaveBeenCalled();
    });

    //Error case of creating a contact when a contact email already exists ignoring case sensitivity for the partner
    it('should throw an error if a contact with the same email already exists for the partner ignoring case sensitivity', async () => {
        partnerRepository.findById = vi.fn().mockResolvedValue({ getId: () => "partner-id" });
        contactRepository.findByPartnerId = vi.fn().mockResolvedValue([
            { getEmail: () => "JOHN.PEREZ@TEST.COM" }
        ]);

        const request: CreateContactRequestDTO = { 
            id: "contact-id",
            name: "John Perez",
            email: "john.perez@test.com",
            role: "Manager",
            partnerId: "partner-id"
        };

        await expect(useCase.execute(request)).rejects.toThrow('Contact e-mail already exists for this partner');
        expect(contactRepository.save).not.toHaveBeenCalled();
    });

    //Error case of creating a contact when saving fails
    it('should throw an error if saving fails', async () => {
        partnerRepository.findById = vi.fn().mockResolvedValue({ getId: () => "partner-id" });
        contactRepository.findByPartnerId = vi.fn().mockResolvedValue([]);
        contactRepository.save = vi.fn().mockResolvedValue(null);

        const request: CreateContactRequestDTO = { 
            id: "contact-id",
            name: "John Perez",
            email: "john.perez@test.com",
            role: "Manager",
            partnerId: "partner-id"
        };

        await expect(useCase.execute(request)).rejects.toThrow('Error saving Contact');
        expect(partnerRepository.findById).toHaveBeenCalledTimes(1);
        expect(contactRepository.findByPartnerId).toHaveBeenCalledTimes(1);
        expect(contactRepository.save).toHaveBeenCalledTimes(1);
    });
});
