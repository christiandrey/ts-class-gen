import {adminRecurringPaymentEntitiesSelector, adminWithdrawalEntitiesSelector, apartmentEntitiesSelector, apartmentBalanceEntitiesSelector, apartmentTypeEntitiesSelector, bankAccountEntitiesSelector, cardEntitiesSelector, communityCategoryEntitiesSelector, communityCommentEntitiesSelector, communityTopicEntitiesSelector, countryEntitiesSelector, currencyEntitiesSelector, estateEntitiesSelector, estateManagerEntitiesSelector, estateWalletEntitiesSelector, facilityManagerEntitiesSelector, facilityManagerLogEntitiesSelector, faqEntitiesSelector, faqCategoryEntitiesSelector, ghostEntitiesSelector, locationEntitiesSelector, logEntitiesSelector, memberEntitiesSelector, memberPermissionEntitiesSelector, notificationEntitiesSelector, organizationEntitiesSelector, organizationClaimEntitiesSelector, organizationWalletEntitiesSelector, ownerEntitiesSelector, paymentEntitiesSelector, paymentAccountEntitiesSelector, paymentBeneficiaryEntitiesSelector, paymentRequestEntitiesSelector, projectEntitiesSelector, projectMessageEntitiesSelector, projectResourceEntitiesSelector, recurringPaymentEntitiesSelector, residentEntitiesSelector, residentInvitationEntitiesSelector, reviewEntitiesSelector, roleEntitiesSelector, serviceCategoryEntitiesSelector, serviceChargeLogEntitiesSelector, stateEntitiesSelector, transactionEntitiesSelector, userEntitiesSelector, userSummaryEntitiesSelector, vendorEntitiesSelector, vendorInvitationEntitiesSelector, walletEntitiesSelector, withdrawalEntitiesSelector} from '../../data/adapters'

import {createSelector} from '@reduxjs/toolkit';

export const apartmentBalanceRelationsSelector = createSelector(
    apartmentBalanceEntitiesSelector,
    paymentAccountRelationsSelector,
    (apartmentBalances, paymentAccountRelations) => ({apartmentBalances, ...paymentAccountRelations}),
);

export const apartmentRelationsSelector = createSelector(
    apartmentEntitiesSelector,
    apartmentTypeRelationsSelector,
    estateRelationsSelector,
    ownerRelationsSelector,
    residentRelationsSelector,
    (apartments, apartmentTypeRelations, estateRelations, ownerRelations, residentRelations) => ({apartments, ...apartmentTypeRelations, ...estateRelations, ...ownerRelations, ...residentRelations}),
);

export const apartmentTypeRelationsSelector = createSelector(
    apartmentTypeEntitiesSelector,
    serviceCategoryRelationsSelector,
    (apartmentTypes, serviceCategoryRelations) => ({apartmentTypes, ...serviceCategoryRelations}),
);

export const bankAccountRelationsSelector = createSelector(
    bankAccountEntitiesSelector,
    (bankAccounts) => ({bankAccounts}),
);

export const cardRelationsSelector = createSelector(
    cardEntitiesSelector,
    currencyRelationsSelector,
    (cards, currencyRelations) => ({cards, ...currencyRelations}),
);

export const communityCategoryRelationsSelector = createSelector(
    communityCategoryEntitiesSelector,
    communityTopicRelationsSelector,
    (communityCategories, communityTopicRelations) => ({communityCategories, ...communityTopicRelations}),
);

export const communityCommentRelationsSelector = createSelector(
    communityCommentEntitiesSelector,
    userRelationsSelector,
    (communityComments, userRelations) => ({communityComments, ...userRelations}),
);

export const communityTopicRelationsSelector = createSelector(
    communityTopicEntitiesSelector,
    userRelationsSelector,
    (communityTopics, userRelations) => ({communityTopics, ...userRelations}),
);

export const countryRelationsSelector = createSelector(
    countryEntitiesSelector,
    (countries) => ({countries}),
);

export const currencyRelationsSelector = createSelector(
    currencyEntitiesSelector,
    (currencies) => ({currencies}),
);

export const estateRelationsSelector = createSelector(
    apartmentTypeRelationsSelector,
    estateEntitiesSelector,
    facilityManagerRelationsSelector,
    locationRelationsSelector,
    organizationRelationsSelector,
    serviceCategoryRelationsSelector,
    (apartmentTypeRelations, estates, facilityManagerRelations, locationRelations, organizationRelations, serviceCategoryRelations) => ({...apartmentTypeRelations, estates, ...facilityManagerRelations, ...locationRelations, ...organizationRelations, ...serviceCategoryRelations}),
);

export const estateManagerRelationsSelector = createSelector(
    estateManagerEntitiesSelector,
    memberRelationsSelector,
    (estateManagers, memberRelations) => ({estateManagers, ...memberRelations}),
);

export const estateWalletRelationsSelector = createSelector(
    estateWalletEntitiesSelector,
    (estateWallets) => ({estateWallets}),
);

export const facilityManagerRelationsSelector = createSelector(
    facilityManagerEntitiesSelector,
    userRelationsSelector,
    (facilityManagers, userRelations) => ({facilityManagers, ...userRelations}),
);

export const facilityManagerLogRelationsSelector = createSelector(
    facilityManagerLogEntitiesSelector,
    (facilityManagerLogs) => ({facilityManagerLogs}),
);

export const faqCategoryRelationsSelector = createSelector(
    faqCategoryEntitiesSelector,
    (faqCategories) => ({faqCategories}),
);

export const faqRelationsSelector = createSelector(
    faqEntitiesSelector,
    faqCategoryRelationsSelector,
    (faqs, faqCategoryRelations) => ({faqs, ...faqCategoryRelations}),
);

export const ghostRelationsSelector = createSelector(
    ghostEntitiesSelector,
    userRelationsSelector,
    (ghosts, userRelations) => ({ghosts, ...userRelations}),
);

export const locationRelationsSelector = createSelector(
    locationEntitiesSelector,
    (locations) => ({locations}),
);

export const logRelationsSelector = createSelector(
    logEntitiesSelector,
    (logs) => ({logs}),
);

export const memberRelationsSelector = createSelector(
    facilityManagerRelationsSelector,
    memberEntitiesSelector,
    (facilityManagerRelations, members) => ({...facilityManagerRelations, members}),
);

export const memberPermissionRelationsSelector = createSelector(
    memberPermissionEntitiesSelector,
    (memberPermissions) => ({memberPermissions}),
);

export const notificationRelationsSelector = createSelector(
    notificationEntitiesSelector,
    (notifications) => ({notifications}),
);

export const organizationClaimRelationsSelector = createSelector(
    organizationClaimEntitiesSelector,
    (organizationClaims) => ({organizationClaims}),
);

export const organizationRelationsSelector = createSelector(
    memberRelationsSelector,
    organizationEntitiesSelector,
    organizationClaimRelationsSelector,
    (memberRelations, organizations, organizationClaimRelations) => ({...memberRelations, organizations, ...organizationClaimRelations}),
);

export const organizationWalletRelationsSelector = createSelector(
    organizationWalletEntitiesSelector,
    (organizationWallets) => ({organizationWallets}),
);

export const ownerRelationsSelector = createSelector(
    ownerEntitiesSelector,
    userRelationsSelector,
    (owners, userRelations) => ({owners, ...userRelations}),
);

export const paymentAccountRelationsSelector = createSelector(
    paymentAccountEntitiesSelector,
    (paymentAccounts) => ({paymentAccounts}),
);

export const paymentBeneficiaryRelationsSelector = createSelector(
    paymentBeneficiaryEntitiesSelector,
    (paymentBeneficiaries) => ({paymentBeneficiaries}),
);

export const paymentRelationsSelector = createSelector(
    estateRelationsSelector,
    paymentEntitiesSelector,
    paymentAccountRelationsSelector,
    paymentBeneficiaryRelationsSelector,
    serviceCategoryRelationsSelector,
    transactionRelationsSelector,
    userRelationsSelector,
    (estateRelations, payments, paymentAccountRelations, paymentBeneficiaryRelations, serviceCategoryRelations, transactionRelations, userRelations) => ({...estateRelations, payments, ...paymentAccountRelations, ...paymentBeneficiaryRelations, ...serviceCategoryRelations, ...transactionRelations, ...userRelations}),
);

export const paymentRequestRelationsSelector = createSelector(
    estateRelationsSelector,
    estateManagerRelationsSelector,
    paymentAccountRelationsSelector,
    paymentBeneficiaryRelationsSelector,
    paymentRequestEntitiesSelector,
    serviceCategoryRelationsSelector,
    userRelationsSelector,
    (estateRelations, estateManagerRelations, paymentAccountRelations, paymentBeneficiaryRelations, paymentRequests, serviceCategoryRelations, userRelations) => ({...estateRelations, ...estateManagerRelations, ...paymentAccountRelations, ...paymentBeneficiaryRelations, paymentRequests, ...serviceCategoryRelations, ...userRelations}),
);

export const projectRelationsSelector = createSelector(
    estateRelationsSelector,
    paymentRelationsSelector,
    projectEntitiesSelector,
    projectResourceRelationsSelector,
    residentRelationsSelector,
    serviceCategoryRelationsSelector,
    vendorRelationsSelector,
    (estateRelations, paymentRelations, projects, projectResourceRelations, residentRelations, serviceCategoryRelations, vendorRelations) => ({...estateRelations, ...paymentRelations, projects, ...projectResourceRelations, ...residentRelations, ...serviceCategoryRelations, ...vendorRelations}),
);

export const projectMessageRelationsSelector = createSelector(
    projectMessageEntitiesSelector,
    (projectMessages) => ({projectMessages}),
);

export const projectResourceRelationsSelector = createSelector(
    projectResourceEntitiesSelector,
    (projectResources) => ({projectResources}),
);

export const recurringPaymentRelationsSelector = createSelector(
    currencyRelationsSelector,
    paymentAccountRelationsSelector,
    paymentBeneficiaryRelationsSelector,
    recurringPaymentEntitiesSelector,
    serviceCategoryRelationsSelector,
    userRelationsSelector,
    (currencyRelations, paymentAccountRelations, paymentBeneficiaryRelations, recurringPayments, serviceCategoryRelations, userRelations) => ({...currencyRelations, ...paymentAccountRelations, ...paymentBeneficiaryRelations, recurringPayments, ...serviceCategoryRelations, ...userRelations}),
);

export const adminRecurringPaymentRelationsSelector = createSelector(
    adminRecurringPaymentEntitiesSelector,
    currencyRelationsSelector,
    estateRelationsSelector,
    paymentAccountRelationsSelector,
    paymentBeneficiaryRelationsSelector,
    serviceCategoryRelationsSelector,
    userRelationsSelector,
    (adminRecurringPayments, currencyRelations, estateRelations, paymentAccountRelations, paymentBeneficiaryRelations, serviceCategoryRelations, userRelations) => ({adminRecurringPayments, ...currencyRelations, ...estateRelations, ...paymentAccountRelations, ...paymentBeneficiaryRelations, ...serviceCategoryRelations, ...userRelations}),
);

export const residentRelationsSelector = createSelector(
    residentEntitiesSelector,
    serviceChargeLogRelationsSelector,
    userRelationsSelector,
    (residents, serviceChargeLogRelations, userRelations) => ({residents, ...serviceChargeLogRelations, ...userRelations}),
);

export const residentInvitationRelationsSelector = createSelector(
    residentInvitationEntitiesSelector,
    (residentInvitations) => ({residentInvitations}),
);

export const reviewRelationsSelector = createSelector(
    reviewEntitiesSelector,
    userRelationsSelector,
    (reviews, userRelations) => ({reviews, ...userRelations}),
);

export const roleRelationsSelector = createSelector(
    roleEntitiesSelector,
    (roles) => ({roles}),
);

export const serviceCategoryRelationsSelector = createSelector(
    serviceCategoryEntitiesSelector,
    (serviceCategories) => ({serviceCategories}),
);

export const serviceChargeLogRelationsSelector = createSelector(
    serviceChargeLogEntitiesSelector,
    (serviceChargeLogs) => ({serviceChargeLogs}),
);

export const stateRelationsSelector = createSelector(
    stateEntitiesSelector,
    (states) => ({states}),
);

export const transactionRelationsSelector = createSelector(
    transactionEntitiesSelector,
    userRelationsSelector,
    (transactions, userRelations) => ({transactions, ...userRelations}),
);

export const userSummaryRelationsSelector = createSelector(
    userSummaryEntitiesSelector,
    (userSummaries) => ({userSummaries}),
);

export const vendorRelationsSelector = createSelector(
    estateRelationsSelector,
    serviceCategoryRelationsSelector,
    userRelationsSelector,
    vendorEntitiesSelector,
    (estateRelations, serviceCategoryRelations, userRelations, vendors) => ({...estateRelations, ...serviceCategoryRelations, ...userRelations, vendors}),
);

export const vendorInvitationRelationsSelector = createSelector(
    vendorInvitationEntitiesSelector,
    (vendorInvitations) => ({vendorInvitations}),
);

export const walletRelationsSelector = createSelector(
    walletEntitiesSelector,
    (wallets) => ({wallets}),
);

export const withdrawalRelationsSelector = createSelector(
    withdrawalEntitiesSelector,
    (withdrawals) => ({withdrawals}),
);

export const adminWithdrawalRelationsSelector = createSelector(
    adminWithdrawalEntitiesSelector,
    estateRelationsSelector,
    userRelationsSelector,
    (adminWithdrawals, estateRelations, userRelations) => ({adminWithdrawals, ...estateRelations, ...userRelations}),
);