export type AppointmentStatus = 'Pending' | 'Accepted' | 'CheckedIn' | 'Done';

export type AvpuScale = 'Alert' | 'Verbal' | 'Pain' | 'Unresponsive';

export type CalendarEventType = 'Appointment' | 'Personal' | 'General';

export type ClinicalVisitType = 'InPatient' | 'OutPatient';

export type EmailTemplateType = 'Default' | 'EmailVerification' | 'ForgotPassword' | 'ResidentInvitation' | 'VendorInvitation' | 'WithdrawalSuccessful' | 'WithdrawalFailed' | 'DefaultAction';

export type FluidReadingRoute = 'Oral' | 'NasogatricOrPegFeed' | 'IntravenousOrSubcutaneous' | 'Urine' | 'BowelOrStoma' | 'AspirationOrVomit' | 'Drain';

export type FluidReadingType = 'Input' | 'Output';

export type FluidReadingUnit = 'Ml' | 'MlPerHour' | 'Flush';

export type Gender = 'None' | 'Male' | 'Female';

export type InvoiceStatus = 'Pending' | 'Settled';

export type LabTestType = 'Fbp' | 'Coagulation' | 'UreaAndElectrolytes' | 'LiverFunction' | 'Cardiac' | 'Crp' | 'Glucose' | 'Calcium' | 'Magnesium' | 'Phosphate' | 'Lactate' | 'Toxicology' | 'BloodGas' | 'Other';

export type LogLevel = 'Verbose' | 'Debug' | 'Information' | 'Warning' | 'Error' | 'Fatal';

export type MedicationFrequency = 'Other' | 'Daily' | 'NHourly' | 'NTimesPerDay' | 'Bedtime' | 'WithMeals' | 'Weekly' | 'Monthly';

export type MessageType = 'Text' | 'Photo' | 'Audio';

export type NotificationType = 'General';

export type PaymentGateway = 'Paystack' | 'Stripe';

export type PaymentRecurrence = 'Hourly' | 'Daily' | 'Weekly' | 'Monthly' | 'Biannually' | 'Annually';

export type TimeDuration = 'None' | 'MilliSecond' | 'Second' | 'Minute' | 'Hour' | 'Day' | 'Week' | 'Month' | 'Quarter' | 'Year';

export type TransactionMode = 'None' | 'BankTransfer' | 'Card' | 'Cash' | 'Insurance';