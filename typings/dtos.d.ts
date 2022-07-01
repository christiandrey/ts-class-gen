import {ApportionmentType, BankAccountType, CommissionType, MemberRoleType, MessageType, PaymentMode, Recurrence, ResourceType} from '.';

export type ApartmentCreationOptions = {
    label: string;
    ownerId?: string;
    estateId?: string;
    typeId: string;
}

export type ApartmentTypeCreationOptions = {
    name: string;
    quantity: number;
    description: string;
    serviceChargeAmount: number;
    serviceChargeRecurrence: Recurrence;
    bedrooms: number;
    size: number;
    estateId?: string;
    servicesIds: Array<string>;
}

export type ApartmentTypeUpdateOptions = {
    name: string;
    quantity?: number;
    description: string;
    serviceChargeAmount?: number;
    serviceChargeRecurrence?: Recurrence;
    bedrooms?: number;
    size?: number;
}

export type ApartmentUpdateOptions = {
    label: string;
    typeId?: string;
    isNotInUse?: boolean;
}

export type BankAccountCreationOptions = {
    accountName: string;
    accountNumber: string;
    type: BankAccountType;
    bankName: string;
    bankCode: string;
}

export type CardCreationOptions = {
    bin: string;
    token: string;
    withdrawToken: string;
    reference: string;
}

export type CommissionUpdateOptions = {
    commissionType: CommissionType;
    commission: number;
}

export type CommunityCategoryCreationOptions = {
    name: string;
    color: string;
}

export type CommunityCommentCreationOptions = {
    body: string;
    hash: string;
}

export type CommunityTopicCreationOptions = {
    name: string;
    description: string;
    categoryId: string;
    estateId: string;
}

export type EstateCreationOptions = {
    name: string;
    placeId: string;
    imageUrl: string;
    apportionmentType: ApportionmentType;
    servicesIds: Array<string>;
}

export type EstateManagerCreationOptions = {
    memberId: string;
    organizationClaimId: string;
}

export type EstateUpdateOptions = {
    name: string;
    placeId: string;
    imageUrl: string;
    apportionmentType?: ApportionmentType;
    concealResidentNames?: boolean;
    unavailableServicesWhenVacant: Array<string>;
}

export type FaqCategoryCreationOptions = {
    name: string;
}

export type FaqCreationOptions = {
    title: string;
    description: string;
    imageUrl: string;
    faqCategoryId: string;
}

export type MemberCreationOptions = {
    username: string;
    name: string;
    isAdmin: boolean;
    canOffboardResident: boolean;
    canOnboardResident: boolean;
    canAddNewApartment: boolean;
}

export type MemberInvitationOptions = {
    facilityManagerId: string;
    isAdmin: boolean;
}

export type MemberPermissionUpdateOptions = {
    canOffboardResident?: boolean;
    canOnboardResident?: boolean;
    canAddNewApartment?: boolean;
}

export type MemberRoleTypeUpdateOptions = {
    role: MemberRoleType;
}

export type OrganizationClaimCreationOptions = {
    name: string;
    scopes: Array<string>;
}

export type OrganizationClaimUpdateOptions = {
    name: string;
    scopes: Array<string>;
}

export type OrganizationCreationOptions = {
    name: string;
    manageFundsOffline: boolean;
}

export type OrganizationUpdateOptions = {
    name: string;
}

export type PaymentAccountCreationOptions = {
    name: string;
}

export type PaymentAccountUpdateOptions = {
    name: string;
}

export type PaymentBeneficiaryCreationOptions = {
    accountName: string;
    accountNumber: string;
    bankName: string;
    bankCode: string;
}

export type PaymentCreationOptions = {
    recipientId: string;
    bankAccountId?: string;
    paymentAccountId?: string;
    localAmount: number;
    description: string;
    notes: string;
    mode: PaymentMode;
    recurrence: Recurrence;
    recurrenceStartAt?: string;
}

export type PaymentUpdateOptions = {
    evidenceUrl: string;
}

export type ProjectCreationOptions = {
    title: string;
    description: string;
    isMaintenance: boolean;
    isPublic: boolean;
    dueDate?: string;
    vendorId?: string;
    categoryId: string;
    resources: Array<ProjectResourceCreationOptions>;
}

export type ProjectMessageCreationOptions = {
    body: string;
    hash: string;
    type: MessageType;
}

export type ProjectResourceCreationOptions = {
    notes: string;
    url: string;
    type: ResourceType;
}

export type ResidentInvitationCreationOptions = {
    email: string;
    houseNumber: string;
    serviceChargeDueDate?: string;
    apartmentTypeId?: string;
    apartmentId?: string;
}

export type ResidentUpdateOptions = {
    houseNumber: string;
    serviceChargeDueDate?: string;
}

export type ReviewOptions = {
    stars: number;
    body: string;
}

export type ServiceCategoryCreationOptions = {
    name: string;
    isPaymentOnly: boolean;
}

export type ServiceChargeUpdateOptions = {
    serviceChargeAmount: number;
    serviceChargeRecurrence?: Recurrence;
    serviceChargeDueDate?: string;
}

export type VendorCreationOptions = {
    servicesIds: Array<string>;
}

export type VendorInvitationCreationOptions = {
    email: string;
    estateId: string;
    servicesIds: Array<string>;
}
