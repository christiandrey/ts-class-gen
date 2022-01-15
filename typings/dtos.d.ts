import {AppointmentStatus, AvpuScale, CalendarEventType, FluidReadingRoute, FluidReadingType, FluidReadingUnit, LabTestType, MedicationFrequency, MessageType, PaymentGateway, PaymentRecurrence, TimeDuration, TransactionMode} from '.';

export type AppointmentCreationOptions = {
    medicId: string;
    startAt: string;
    endAt: string;
}

export type AppointmentStatusUpdateOptions = {
    status: AppointmentStatus;
}

export type BillingItemCreationOptions = {
    name: string;
    description: string;
    localUnitPrice: number;
}

export type BillingItemUpdateOptions = {
    name: string;
    description: string;
    localUnitPrice?: number;
}

export type CalendarEventCreationOptions = {
    title: string;
    type: CalendarEventType;
    startAt: string;
    endAt: string;
    participantsIds: Array<string>;
}

export type CalendarEventUpdateOptions = {
    title: string;
    startAt?: string;
    endAt?: string;
}

export type ChatMessageCreationOptions = {
    body: string;
    hash: string;
    type: MessageType;
}

export type DataRangeCreationOptions = {
    name: string;
    lowerValue: number;
    upperValue: number;
    unit: string;
}

export type DataRangeUpdateOptions = {
    name: string;
    lowerValue?: number;
    upperValue?: number;
    unit: string;
}

export type DischargeSummaryCreationOptions = {
    dischargedAt?: string;
    presentingComplaints: string;
    complaintHistory: string;
    investigations: string;
    diagnoses: string;
    management: string;
    complications: string;
    operations: string;
    futureManagement: string;
}

export type EncounterCreationOptions = {
    presentingComplaint: string;
    complaintHistory: string;
    weightInKg: number;
    heightInCm: number;
    cardiovascularSystem: string;
    respiratorySystem: string;
    gastrointestinalSystem: string;
    genitounirarySystem: string;
    neurologicalSystem: string;
    diagnosis: string;
    management: string;
    notes: string;
}

export type EncounterUpdateOptions = {
    presentingComplaint: string;
    complaintHistory: string;
    weightInKg?: number;
    heightInCm?: number;
    cardiovascularSystem: string;
    respiratorySystem: string;
    gastrointestinalSystem: string;
    genitounirarySystem: string;
    neurologicalSystem: string;
    diagnosis: string;
    management: string;
    notes: string;
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

export type FluidReadingCreationOptions = {
    recordedAt?: string;
    type: FluidReadingType;
    route: FluidReadingRoute;
    unit: FluidReadingUnit;
    quantity: number;
}

export type GuestCreationOptions = {
    email: string;
    firstName: string;
    lastName: string;
    accessExpiresAt?: string;
    canAccessFinances: boolean;
    canAccessMedication: boolean;
    canAccessAppointments: boolean;
    canAccessLabResults: boolean;
}

export type GuestUpdateOptions = {
    accessExpiresAt?: string;
    canAccessAppointments?: boolean;
    canAccessFinances?: boolean;
    canAccessLabResults?: boolean;
    canAccessMedication?: boolean;
}

export type HospitalCreationOptions = {
    name: string;
    imageUrl: string;
    addressLine1: string;
    addressLine2: string;
    stateId: string;
    countryId: string;
    managerEmail: string;
    managerFirstName: string;
    managerLastName: string;
    servicesIds: Array<string>;
}

export type HospitalStatsOptions = {
    timeDuration: TimeDuration;
    startDate: string;
}

export type HospitalUpdateOptions = {
    name: string;
    imageUrl: string;
    addressLine1: string;
    addressLine2: string;
    stateId?: string;
    countryId?: string;
}

export type InvoiceCreationOptions = {
    items: Array<InvoiceItemCreationOptions>;
}

export type InvoiceItemCreationOptions = {
    billingItemId: string;
    quantity: number;
}

export type InvoiceSettleOptions = {
    localAmount: number;
    mode: TransactionMode;
}

export type LabScanCreationOptions = {
    url: string;
    previewUrl: string;
}

export type LabScanUpdateOptions = {
    notes: string;
}

export type LabTestCreationOptions = {
    results: Array<LabTestResultCreationOptions>;
}

export type LabTestResultCreationOptions = {
    type: LabTestType;
    description: string;
}

export type LabTestResultUpdateOptions = {
    data: string;
}

export type ManagerCreationOptions = {
    email: string;
    firstName: string;
    lastName: string;
}

export type ManagerUpdateOptions = {
    designation: string;
}

export type MedicCreationOptions = {
    email: string;
    firstName: string;
    lastName: string;
    designation: string;
    registrationNumber: string;
    servicesIds: Array<string>;
}

export type MedicUpdateOptions = {
    designation: string;
    registrationNumber: string;
}

export type MedicationCreationOptions = {
    name: string;
    instructions: string;
    dosage: string;
    frequency: MedicationFrequency;
    frequencyCount: number;
    otherFrequency: string;
    firstDoseAt: string;
    lastDoseAt?: string;
}

export type NonMedicCreationOptions = {
    email: string;
    firstName: string;
    lastName: string;
    designation: string;
}

export type NonMedicUpdateOptions = {
    designation: string;
}

export type PatientCreationOptions = {
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    addressLine1: string;
    addressLine2: string;
    stateId: string;
    countryId: string;
    biodata: PatientBiodataCreationOptions;
    socialHistory: PatientSocialHistoryCreationOptions;
}

export type PatientBiodataCreationOptions = {
    bloodGroup: string;
    rhesusFactor: string;
    genotype: string;
    allergies: string;
    alerts: string;
    disabilities: string;
    underlyingMedicalConditions: string;
}

export type PatientSocialHistoryCreationOptions = {
    smoker: boolean;
    smokingDuration: number;
    smokingDurationUnit: TimeDuration;
    dailySmokingFrequency: number;
    occupation: string;
}

export type PatientUpdateOptions = {
    dateOfBirth?: string;
    addressLine1: string;
    addressLine2: string;
    stateId?: string;
    countryId?: string;
}

export type PatientBiodataUpdateOptions = {
    bloodGroup: string;
    rhesusFactor: string;
    genotype: string;
    allergies: string;
    alerts: string;
    disabilities: string;
    underlyingMedicalConditions: string;
}

export type PatientSocialHistoryUpdateOptions = {
    smoker?: boolean;
    smokingDuration?: number;
    smokingDurationUnit?: TimeDuration;
    dailySmokingFrequency?: number;
    occupation: string;
}

export type PaymentPlanCreationOptions = {
    name: string;
    recurrence: PaymentRecurrence;
    medics: number;
    nonMedics: number;
    localPrice: number;
    localPricePerMedic: number;
    localPricePerNonMedic: number;
}

export type PaymentPlanUpdateOptions = {
    name: string;
    recurrence?: PaymentRecurrence;
    medics?: number;
    nonMedics?: number;
    localPrice?: number;
    localPricePerMedic?: number;
    localPricePerNonMedic?: number;
}

export type PlanSubscriptionCreationOptions = {
    paymentPlanId: string;
    transactionReference: string;
    gateway: PaymentGateway;
}

export type ServiceCategoryCreationOptions = {
    name: string;
}

export type UserCreationOptions = {
    lastName: string;
    firstName: string;
    email: string;
}

export type UserSetupOptions = {
    password: string;
}

export type VitalReadingCreationOptions = {
    pulse: number;
    bloodPressureSystolic: number;
    bloodPressureDiastolic: number;
    respiratoryRate: number;
    oxygenSaturation: number;
    temperatureCelsius: number;
    avpu: AvpuScale;
}
