export interface CreatePartnerRequestDTO {
  id?: string
  name: string
  active?: boolean
}

export interface CreatePartnerResponseDTO {
  id: string
  name: string
  active: boolean
}
