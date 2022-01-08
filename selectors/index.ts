import {activityLogEntitiesSelector, appointmentEntitiesSelector, billingItemEntitiesSelector, calendarEventEntitiesSelector, chatEntitiesSelector, chatMessageEntitiesSelector, clinicalVisitEntitiesSelector, countryEntitiesSelector, currencyEntitiesSelector, dataRangeEntitiesSelector, dischargeSummaryEntitiesSelector, encounterEntitiesSelector, faqEntitiesSelector, faqCategoryEntitiesSelector, fluidReadingEntitiesSelector, guestEntitiesSelector, hospitalEntitiesSelector, invoiceEntitiesSelector, invoiceItemEntitiesSelector, labScanEntitiesSelector, labTestEntitiesSelector, labTestResultEntitiesSelector, logEntitiesSelector, managerEntitiesSelector, medicEntitiesSelector, medicationEntitiesSelector, nonMedicEntitiesSelector, notificationEntitiesSelector, patientEntitiesSelector, patientBiodataEntitiesSelector, patientSocialHistoryEntitiesSelector, paymentPlanEntitiesSelector, planSubscriptionEntitiesSelector, roleEntitiesSelector, serviceCategoryEntitiesSelector, settingEntitiesSelector, stateEntitiesSelector, transactionEntitiesSelector, userEntitiesSelector, vitalReadingEntitiesSelector} from '../../data/adapters'

import {createSelector} from '@reduxjs/toolkit';

export const activityLogRelationsSelector = createSelector(
    activityLogEntitiesSelector,
    userEntitiesSelector,
    (activityLogs, users) => ({activityLogs, users}),
);

export const appointmentRelationsSelector = createSelector(
    appointmentEntitiesSelector,
    calendarEventEntitiesSelector,
    medicEntitiesSelector,
    patientEntitiesSelector,
    (appointments, calendarEvents, medics, patients) => ({appointments, calendarEvents, medics, patients}),
);

export const billingItemRelationsSelector = createSelector(
    billingItemEntitiesSelector,
    (billingItems) => ({billingItems}),
);

export const calendarEventRelationsSelector = createSelector(
    calendarEventEntitiesSelector,
    userEntitiesSelector,
    (calendarEvents, users) => ({calendarEvents, users}),
);

export const chatRelationsSelector = createSelector(
    chatEntitiesSelector,
    chatMessageEntitiesSelector,
    userEntitiesSelector,
    (chats, chatMessages, users) => ({chats, chatMessages, users}),
);

export const chatMessageRelationsSelector = createSelector(
    chatMessageEntitiesSelector,
    userEntitiesSelector,
    (chatMessages, users) => ({chatMessages, users}),
);

export const clinicalVisitRelationsSelector = createSelector(
    clinicalVisitEntitiesSelector,
    dischargeSummaryEntitiesSelector,
    invoiceEntitiesSelector,
    (clinicalVisits, dischargeSummaries, invoices) => ({clinicalVisits, dischargeSummaries, invoices}),
);

export const countryRelationsSelector = createSelector(
    countryEntitiesSelector,
    (countries) => ({countries}),
);

export const currencyRelationsSelector = createSelector(
    currencyEntitiesSelector,
    (currencies) => ({currencies}),
);

export const dataRangeRelationsSelector = createSelector(
    dataRangeEntitiesSelector,
    (dataRanges) => ({dataRanges}),
);

export const dischargeSummaryRelationsSelector = createSelector(
    dischargeSummaryEntitiesSelector,
    medicEntitiesSelector,
    (dischargeSummaries, medics) => ({dischargeSummaries, medics}),
);

export const encounterRelationsSelector = createSelector(
    encounterEntitiesSelector,
    labScanEntitiesSelector,
    labTestEntitiesSelector,
    medicEntitiesSelector,
    vitalReadingEntitiesSelector,
    (encounters, labScans, labTests, medics, vitalReadings) => ({encounters, labScans, labTests, medics, vitalReadings}),
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

export const fluidReadingRelationsSelector = createSelector(
    fluidReadingEntitiesSelector,
    (fluidReadings) => ({fluidReadings}),
);

export const guestRelationsSelector = createSelector(
    guestEntitiesSelector,
    userEntitiesSelector,
    (guests, users) => ({guests, users}),
);

export const hospitalRelationsSelector = createSelector(
    countryEntitiesSelector,
    hospitalEntitiesSelector,
    stateEntitiesSelector,
    (countries, hospitals, states) => ({countries, hospitals, states}),
);

export const invoiceRelationsSelector = createSelector(
    invoiceEntitiesSelector,
    invoiceItemEntitiesSelector,
    nonMedicEntitiesSelector,
    transactionEntitiesSelector,
    (invoices, invoiceItems, nonMedics, transactions) => ({invoices, invoiceItems, nonMedics, transactions}),
);

export const invoiceItemRelationsSelector = createSelector(
    invoiceItemEntitiesSelector,
    medicEntitiesSelector,
    (invoiceItems, medics) => ({invoiceItems, medics}),
);

export const labScanRelationsSelector = createSelector(
    labScanEntitiesSelector,
    medicEntitiesSelector,
    nonMedicEntitiesSelector,
    (labScans, medics, nonMedics) => ({labScans, medics, nonMedics}),
);

export const labTestRelationsSelector = createSelector(
    labTestEntitiesSelector,
    labTestResultEntitiesSelector,
    (labTests, labTestResults) => ({labTests, labTestResults}),
);

export const labTestResultRelationsSelector = createSelector(
    labTestResultEntitiesSelector,
    nonMedicEntitiesSelector,
    (labTestResults, nonMedics) => ({labTestResults, nonMedics}),
);

export const logRelationsSelector = createSelector(
    logEntitiesSelector,
    (logs) => ({logs}),
);

export const managerRelationsSelector = createSelector(
    hospitalEntitiesSelector,
    managerEntitiesSelector,
    userEntitiesSelector,
    (hospitals, managers, users) => ({hospitals, managers, users}),
);

export const medicRelationsSelector = createSelector(
    hospitalEntitiesSelector,
    medicEntitiesSelector,
    serviceCategoryEntitiesSelector,
    userEntitiesSelector,
    (hospitals, medics, serviceCategories, users) => ({hospitals, medics, serviceCategories, users}),
);

export const medicationRelationsSelector = createSelector(
    medicEntitiesSelector,
    medicationEntitiesSelector,
    (medics, medications) => ({medics, medications}),
);

export const nonMedicRelationsSelector = createSelector(
    hospitalEntitiesSelector,
    nonMedicEntitiesSelector,
    userEntitiesSelector,
    (hospitals, nonMedics, users) => ({hospitals, nonMedics, users}),
);

export const notificationRelationsSelector = createSelector(
    notificationEntitiesSelector,
    (notifications) => ({notifications}),
);

export const patientBiodataRelationsSelector = createSelector(
    patientBiodataEntitiesSelector,
    (patientBiodatas) => ({patientBiodatas}),
);

export const patientRelationsSelector = createSelector(
    countryEntitiesSelector,
    patientEntitiesSelector,
    patientBiodataEntitiesSelector,
    patientSocialHistoryEntitiesSelector,
    stateEntitiesSelector,
    userEntitiesSelector,
    (countries, patients, patientBiodatas, patientSocialHistories, states, users) => ({countries, patients, patientBiodatas, patientSocialHistories, states, users}),
);

export const patientSocialHistoryRelationsSelector = createSelector(
    patientSocialHistoryEntitiesSelector,
    (patientSocialHistories) => ({patientSocialHistories}),
);

export const paymentPlanRelationsSelector = createSelector(
    paymentPlanEntitiesSelector,
    (paymentPlans) => ({paymentPlans}),
);

export const planSubscriptionRelationsSelector = createSelector(
    planSubscriptionEntitiesSelector,
    (planSubscriptions) => ({planSubscriptions}),
);

export const roleRelationsSelector = createSelector(
    roleEntitiesSelector,
    (roles) => ({roles}),
);

export const serviceCategoryRelationsSelector = createSelector(
    serviceCategoryEntitiesSelector,
    (serviceCategories) => ({serviceCategories}),
);

export const settingRelationsSelector = createSelector(
    settingEntitiesSelector,
    (settings) => ({settings}),
);

export const stateRelationsSelector = createSelector(
    stateEntitiesSelector,
    (states) => ({states}),
);

export const transactionRelationsSelector = createSelector(
    patientEntitiesSelector,
    transactionEntitiesSelector,
    (patients, transactions) => ({patients, transactions}),
);

export const userRelationsSelector = createSelector(
    roleEntitiesSelector,
    userEntitiesSelector,
    (roles, users) => ({roles, users}),
);

export const vitalReadingRelationsSelector = createSelector(
    vitalReadingEntitiesSelector,
    (vitalReadings) => ({vitalReadings}),
);