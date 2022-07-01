export type ApportionmentType = 'Size' | 'Bedrooms';

export type BankAccountType = 'Individual' | 'Company';

export type CommissionType = 'Percentage' | 'Amount';

export type EmailTemplateType = 'Default' | 'EmailVerification' | 'ForgotPassword' | 'ResidentInvitation' | 'VendorInvitation' | 'BeneficiaryWithdrawRequest' | 'WithdrawRequest' | 'WithdrawalSuccessful' | 'WithdrawalFailed' | 'ExistingResidentOnboarded' | 'ResidentOnboarded' | 'ResidentsOnboarded' | 'MemberCreated' | 'LowMessagingProviderBalance' | 'LowPaymentsProviderBalance' | 'PaymentRequestCreated' | 'DefaultAction';

export type Gender = 'None' | 'Male' | 'Female';

export type LogLevel = 'Verbose' | 'Debug' | 'Information' | 'Warning' | 'Error' | 'Fatal';

export type MemberRoleType = 'Member' | 'Admin' | 'Owner';

export type MessageType = 'Text' | 'Photo' | 'Audio';

export type NotificationType = 'General' | 'ProjectCreated' | 'VendorProjectAssigned' | 'ResidentProjectAssigned' | 'ProjectAccepted' | 'ProjectOngoing' | 'ProjectClosed' | 'ProjectResolved' | 'PublicProjectCreated' | 'PublicProjectClosed' | 'PublicProjectResolved' | 'PaymentReceived' | 'CommissionReceived' | 'CommissionUpdated' | 'CommunityTopicCreated' | 'CommunityCommentCreated' | 'ProjectMessageCreated' | 'ResidentInvitationAccepted' | 'VendorInvitationAccepted' | 'LowServiceChargeBalance' | 'EstateAssigned';

export type PaymentGateway = 'Paystack' | 'Stripe';

export type PaymentMode = 'Wallet' | 'OrganizationWallet' | 'EstateWallet' | 'BankAccount';

export type PaymentRequestStatus = 'Pending' | 'Approved' | 'Rejected';

export type ProjectStatus = 'Pending' | 'Accepted' | 'Ongoing' | 'Resolved' | 'Completed';

export type Recurrence = 'None' | 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';

export type ResourceType = 'Photo' | 'Video';

export type TransactionMode = 'None' | 'Card' | 'BankTransfer' | 'Cash' | 'Wallet';

export type UserAccountType = 'None' | 'FacilityManager' | 'Vendor' | 'Resident' | 'Owner' | 'Ghost';

export type UserStatus = 'None' | 'Unverified' | 'Verified' | 'FacilityManager' | 'Vendor' | 'Resident' | 'Owner' | 'Ghost';

export type WithdrawalDestinationType = 'Card' | 'BankAccount';

export type WithdrawalStatus = 'Pending' | 'Cancelled' | 'Processing' | 'Failed' | 'Completed';