import {adminRecurringPaymentEntitiesSelector, adminWithdrawalEntitiesSelector, apartmentEntitiesSelector, apartmentTypeEntitiesSelector, bankAccountEntitiesSelector, cardEntitiesSelector, communityCategoryEntitiesSelector, communityCommentEntitiesSelector, communityTopicEntitiesSelector, countryEntitiesSelector, currencyEntitiesSelector, estateEntitiesSelector, estateWalletEntitiesSelector, facilityManagerEntitiesSelector, facilityManagerLogEntitiesSelector, faqEntitiesSelector, faqCategoryEntitiesSelector, ghostEntitiesSelector, locationEntitiesSelector, logEntitiesSelector, memberEntitiesSelector, memberPermissionEntitiesSelector, notificationEntitiesSelector, organizationEntitiesSelector, organizationWalletEntitiesSelector, ownerEntitiesSelector, paymentEntitiesSelector, paymentBeneficiaryEntitiesSelector, paymentRequestEntitiesSelector, projectEntitiesSelector, projectMessageEntitiesSelector, projectResourceEntitiesSelector, recurringPaymentEntitiesSelector, residentEntitiesSelector, residentInvitationEntitiesSelector, reviewEntitiesSelector, roleEntitiesSelector, serviceCategoryEntitiesSelector, serviceChargeLogEntitiesSelector, stateEntitiesSelector, transactionEntitiesSelector, userEntitiesSelector, userSummaryEntitiesSelector, vendorEntitiesSelector, vendorInvitationEntitiesSelector, walletEntitiesSelector, withdrawalEntitiesSelector} from '../../data/adapters'

import {createSelector} from '@reduxjs/toolkit';

export const apartmentRelationsSelector = createSelector(
    apartmentEntitiesSelector,
    apartmentTypeEntitiesSelector,
    estateEntitiesSelector,
    ownerEntitiesSelector,
    residentEntitiesSelector,
    (apartments, apartmentTypes, estates, owners, residents) => ({apartments, apartmentTypes, estates, owners, residents}),
);

export const apartmentTypeRelationsSelector = createSelector(
    apartmentTypeEntitiesSelector,
    serviceCategoryEntitiesSelector,
    (apartmentTypes, serviceCategories) => ({apartmentTypes, serviceCategories}),
);

export const bankAccountRelationsSelector = createSelector(
    bankAccountEntitiesSelector,
    (bankAccounts) => ({bankAccounts}),
);

export const cardRelationsSelector = createSelector(
    cardEntitiesSelector,
    currencyEntitiesSelector,
    (cards, currencies) => ({cards, currencies}),
);

export const communityCategoryRelationsSelector = createSelector(
    communityCategoryEntitiesSelector,
    communityTopicEntitiesSelector,
    (communityCategories, communityTopics) => ({communityCategories, communityTopics}),
);

export const communityCommentRelationsSelector = createSelector(
    communityCommentEntitiesSelector,
    userEntitiesSelector,
    (communityComments, users) => ({communityComments, users}),
);

export const communityTopicRelationsSelector = createSelector(
    communityTopicEntitiesSelector,
    userEntitiesSelector,
    (communityTopics, users) => ({communityTopics, users}),
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
    apartmentTypeEntitiesSelector,
    estateEntitiesSelector,
    facilityManagerEntitiesSelector,
    locationEntitiesSelector,
    organizationEntitiesSelector,
    serviceCategoryEntitiesSelector,
    (apartmentTypes, estates, facilityManagers, locations, organizations, serviceCategories) => ({apartmentTypes, estates, facilityManagers, locations, organizations, serviceCategories}),
);

export const estateWalletRelationsSelector = createSelector(
    estateWalletEntitiesSelector,
    (estateWallets) => ({estateWallets}),
);

export const facilityManagerRelationsSelector = createSelector(
    facilityManagerEntitiesSelector,
    userEntitiesSelector,
    (facilityManagers, users) => ({facilityManagers, users}),
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
    faqCategoryEntitiesSelector,
    (faqs, faqCategories) => ({faqs, faqCategories}),
);

export const ghostRelationsSelector = createSelector(
    ghostEntitiesSelector,
    userEntitiesSelector,
    (ghosts, users) => ({ghosts, users}),
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
    facilityManagerEntitiesSelector,
    memberEntitiesSelector,
    memberPermissionEntitiesSelector,
    (facilityManagers, members, memberPermissions) => ({facilityManagers, members, memberPermissions}),
);

export const memberPermissionRelationsSelector = createSelector(
    memberPermissionEntitiesSelector,
    (memberPermissions) => ({memberPermissions}),
);

export const notificationRelationsSelector = createSelector(
    notificationEntitiesSelector,
    (notifications) => ({notifications}),
);

export const organizationRelationsSelector = createSelector(
    memberEntitiesSelector,
    organizationEntitiesSelector,
    (members, organizations) => ({members, organizations}),
);

export const organizationWalletRelationsSelector = createSelector(
    organizationWalletEntitiesSelector,
    (organizationWallets) => ({organizationWallets}),
);

export const ownerRelationsSelector = createSelector(
    ownerEntitiesSelector,
    userEntitiesSelector,
    (owners, users) => ({owners, users}),
);

export const paymentBeneficiaryRelationsSelector = createSelector(
    paymentBeneficiaryEntitiesSelector,
    (paymentBeneficiaries) => ({paymentBeneficiaries}),
);

export const paymentRelationsSelector = createSelector(
    estateEntitiesSelector,
    paymentEntitiesSelector,
    paymentBeneficiaryEntitiesSelector,
    serviceCategoryEntitiesSelector,
    transactionEntitiesSelector,
    userEntitiesSelector,
    (estates, payments, paymentBeneficiaries, serviceCategories, transactions, users) => ({estates, payments, paymentBeneficiaries, serviceCategories, transactions, users}),
);

export const paymentRequestRelationsSelector = createSelector(
    estateEntitiesSelector,
    memberEntitiesSelector,
    paymentBeneficiaryEntitiesSelector,
    paymentRequestEntitiesSelector,
    serviceCategoryEntitiesSelector,
    userEntitiesSelector,
    (estates, members, paymentBeneficiaries, paymentRequests, serviceCategories, users) => ({estates, members, paymentBeneficiaries, paymentRequests, serviceCategories, users}),
);

export const projectRelationsSelector = createSelector(
    estateEntitiesSelector,
    paymentEntitiesSelector,
    projectEntitiesSelector,
    projectResourceEntitiesSelector,
    residentEntitiesSelector,
    serviceCategoryEntitiesSelector,
    vendorEntitiesSelector,
    (estates, payments, projects, projectResources, residents, serviceCategories, vendors) => ({estates, payments, projects, projectResources, residents, serviceCategories, vendors}),
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
    currencyEntitiesSelector,
    paymentBeneficiaryEntitiesSelector,
    recurringPaymentEntitiesSelector,
    serviceCategoryEntitiesSelector,
    userEntitiesSelector,
    (currencies, paymentBeneficiaries, recurringPayments, serviceCategories, users) => ({currencies, paymentBeneficiaries, recurringPayments, serviceCategories, users}),
);

export const adminRecurringPaymentRelationsSelector = createSelector(
    adminRecurringPaymentEntitiesSelector,
    currencyEntitiesSelector,
    estateEntitiesSelector,
    paymentBeneficiaryEntitiesSelector,
    serviceCategoryEntitiesSelector,
    userEntitiesSelector,
    (adminRecurringPayments, currencies, estates, paymentBeneficiaries, serviceCategories, users) => ({adminRecurringPayments, currencies, estates, paymentBeneficiaries, serviceCategories, users}),
);

export const residentRelationsSelector = createSelector(
    residentEntitiesSelector,
    serviceChargeLogEntitiesSelector,
    userEntitiesSelector,
    (residents, serviceChargeLogs, users) => ({residents, serviceChargeLogs, users}),
);

export const residentInvitationRelationsSelector = createSelector(
    residentInvitationEntitiesSelector,
    (residentInvitations) => ({residentInvitations}),
);

export const reviewRelationsSelector = createSelector(
    reviewEntitiesSelector,
    userEntitiesSelector,
    (reviews, users) => ({reviews, users}),
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
    userEntitiesSelector,
    (transactions, users) => ({transactions, users}),
);

export const userSummaryRelationsSelector = createSelector(
    userSummaryEntitiesSelector,
    (userSummaries) => ({userSummaries}),
);

export const vendorRelationsSelector = createSelector(
    estateEntitiesSelector,
    serviceCategoryEntitiesSelector,
    userEntitiesSelector,
    vendorEntitiesSelector,
    (estates, serviceCategories, users, vendors) => ({estates, serviceCategories, users, vendors}),
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
    estateEntitiesSelector,
    userEntitiesSelector,
    (adminWithdrawals, estates, users) => ({adminWithdrawals, estates, users}),
);