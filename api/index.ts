const appointments = () => {
    const path = 'appointments';

    return {
        readById: (id: string) => instance.get<ApiResponse<Appointment>>(build(path, id)),
        updateStatus: (id: string, options: AppointmentStatusUpdateOptions) => instance.put<ApiResponse<Appointment>>(build(path, id, 'status'), options),
        reschedule: (id: string, options: CalendarEventUpdateOptions) => instance.patch<ApiResponse<Appointment>>(build(path, id, 'reschedule'), options),
    }
}

const auth = () => {
    const path = 'auth';

    return {
        authenticateUser: (dto: Authenticate) => instance.post<ApiResponse<AuthResponse>>(build(path, 'token'), dto),
        refreshToken: (refreshToken: string) => instance.post<ApiResponse<AuthResponse>>(build(path, 'refresh'), null, {params:{refreshToken}}),
        forgotPassword: (email: string) => instance.post<ApiResponse>(build(path, 'passwords', 'forgot'), null, {params:{email}}),
        resetPassword: (dto: ResetPassword) => instance.post<ApiResponse<AuthResponse>>(build(path, 'passwords', 'reset'), dto),
        verifyResetPasswordCode: (dto: VerifyResetCode) => instance.post<ApiResponse>(build(path, 'passwords', 'reset', 'verify'), dto),
    }
}

const billingItems = () => {
    const path = 'billing-items';

    return {
        readById: (id: string) => instance.get<ApiResponse<BillingItem>>(build(path, id)),
        update: (id: string, options: BillingItemUpdateOptions) => instance.patch<ApiResponse<BillingItem>>(build(path, id), options),
        delete: (id: string) => instance.delete<ApiResponse>(build(path, id)),
    }
}

const calendarEvents = () => {
    const path = 'calendar-events';

    return {
        create: (options: CalendarEventCreationOptions) => instance.post<ApiResponse<CalendarEvent>>(build(path), options),
        readById: (id: string) => instance.get<ApiResponse<CalendarEvent>>(build(path, id)),
        readAppointment: (id: string) => instance.get<ApiResponse<Appointment>>(build(path, id, 'appointment')),
        update: (id: string, options: CalendarEventUpdateOptions) => instance.patch<ApiResponse<CalendarEvent>>(build(path, id), options),
        delete: (id: string) => instance.delete<ApiResponse>(build(path, id)),
    }
}

const chats = () => {
    const path = 'chats';

    return {
        create: (id: string, participantsIds: Array<string>) => instance.post<ApiResponse<Chat>>(build(path, id), participantsIds),
        createMessage: (id: string, options: ChatMessageCreationOptions) => instance.post<ApiResponse<ChatMessage>>(build(path, id, 'messages'), options),
        readChatById: (id: string) => instance.get<ApiResponse<Chat>>(build(path, id)),
        readChats: () => instance.get<ApiResponse<Array<Chat>>>(build(path)),
        readChatMessages: (id: string, page = 0, pageSize = 30) => instance.get<PaginatedApiResponse<ChatMessage>>(build(path, id, 'messages'), {params:{page, pageSize}}),
        readChatMessageById: (id: string, messageId: string) => instance.get<ApiResponse<ChatMessage>>(build(path, id, 'messages', messageId)),
    }
}

const clinicalVisits = () => {
    const path = 'clinical-visits';

    return {
        createEncounter: (id: string, options: EncounterCreationOptions) => instance.post<ApiResponse<Encounter>>(build(path, id, 'encounters'), options),
        readById: (id: string) => instance.get<ApiResponse<ClinicalVisit>>(build(path, id)),
        readEncounters: (id: string) => instance.get<ApiResponse<Array<EncounterLite>>>(build(path, id, 'encounters')),
        readFluidReadings: (id: string) => instance.get<ApiResponse<Array<FluidReading>>>(build(path, id, 'fluid-readings')),
        createDischargeSummary: (id: string, options: DischargeSummaryCreationOptions) => instance.post<ApiResponse<DischargeSummary>>(build(path, id, 'discharge-summary'), options),
        createInvoice: (id: string, options: InvoiceCreationOptions) => instance.post<ApiResponse<Invoice>>(build(path, id, 'invoice'), options),
    }
}

const currencies = () => {
    const path = 'currencies';

    return {
        readCurrencies: () => instance.get<ApiResponse<Array<Currency>>>(build(path)),
        readCurrencyForCurrentRegion: () => instance.get<ApiResponse<Currency>>(build(path, 'current')),
        updateCurrency: (currencyId: string, dto: UpdatedCurrency) => instance.put<ApiResponse<Currency>>(build(path, currencyId), dto),
    }
}

const dataRanges = () => {
    const path = 'data-ranges';

    return {
        readById: (id: string) => instance.get<ApiResponse<DataRange>>(build(path, id)),
        update: (id: string, options: DataRangeUpdateOptions) => instance.patch<ApiResponse<DataRange>>(build(path, id), options),
        delete: (id: string) => instance.delete<ApiResponse>(build(path, id)),
    }
}

const encounters = () => {
    const path = 'encounters';

    return {
        createLabTest: (id: string, options: LabTestCreationOptions) => instance.post<ApiResponse<LabTest>>(build(path, id, 'lab', 'tests'), options),
        createLabScan: (id: string, options: LabScanCreationOptions) => instance.post<ApiResponse<LabScan>>(build(path, id, 'lab', 'scans'), options),
        createVitalReading: (id: string, options: VitalReadingCreationOptions) => instance.post<ApiResponse<VitalReading>>(build(path, id, 'vital-readings'), options),
        createFluidReading: (id: string, options: FluidReadingCreationOptions) => instance.post<ApiResponse<FluidReading>>(build(path, id, 'fluid-readings'), options),
        readById: (id: string) => instance.get<ApiResponse<Encounter>>(build(path, id)),
        readFluidReadings: (id: string) => instance.get<ApiResponse<Array<FluidReading>>>(build(path, id, 'fluid-readings')),
        readLabScans: (id: string) => instance.get<ApiResponse<Array<LabScan>>>(build(path, id, 'lab', 'scans')),
        update: (id: string, options: EncounterUpdateOptions) => instance.patch<ApiResponse<Encounter>>(build(path, id), options),
    }
}

const guests = () => {
    const path = 'guests';

    return {
        readCurrent: () => instance.get<ApiResponse<Guest>>(build(path, 'current')),
        update: (id: string, options: GuestUpdateOptions) => instance.patch<ApiResponse<Guest>>(build(path, id), options),
        delete: (id: string) => instance.delete<ApiResponse>(build(path, id)),
    }
}

const health = () => {
    const path = 'health';

    return {
        checkHealth: () => instance.get<ApiResponse>(build(path)),
        checkDatabaseHealth: () => instance.get<ApiResponse>(build(path, 'database')),
    }
}

const hospitals = () => {
    const path = 'hospitals';

    return {
        createHospital: (options: HospitalCreationOptions) => instance.post<ApiResponse<Hospital>>(build(path), options),
        readCurrentHospital: () => instance.get<ApiResponse<Hospital>>(build(path, 'current')),
        readPatients: (id: string, query?: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<PatientLite>>(build(path, id, 'patients'), {params:{query, page, pageSize}}),
        createPatient: (id: string, options: PatientCreationOptions) => instance.post<ApiResponse<Patient>>(build(path, id, 'patients'), options),
        readHospitals: (query?: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<Hospital>>(build(path), {params:{query, page, pageSize}}),
        updateHospital: (id: string, options: HospitalUpdateOptions) => instance.patch<ApiResponse<Hospital>>(build(path, id), options),
        updateHospitalServices: (id: string, servicesIds: Array<string>) => instance.put<ApiResponse<Hospital>>(build(path, id, 'services'), servicesIds),
        deleteHospital: (id: string) => instance.delete<ApiResponse>(build(path, id)),
        readHospital: (id: string) => instance.get<ApiResponse<Hospital>>(build(path, id)),
        readMedics: (id: string) => instance.get<ApiResponse<Array<Medic>>>(build(path, id, 'medics')),
        createMedic: (id: string, options: MedicCreationOptions) => instance.post<ApiResponse<Medic>>(build(path, id, 'medics'), options),
        readNonMedics: (id: string) => instance.get<ApiResponse<Array<NonMedic>>>(build(path, id, 'non-medics')),
        createNonMedic: (id: string, options: NonMedicCreationOptions) => instance.post<ApiResponse<NonMedic>>(build(path, id, 'non-medics'), options),
        readMedicsCalendarEvents: (id: string, startDate: string, endDate: string) => instance.get<ApiResponse<Array<CalendarEvent>>>(build(path, id, 'medics', 'calendar-events', startDate, endDate)),
        readPlanSubscriptions: (id: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<PlanSubscription>>(build(path, id, 'plan-subscriptions'), {params:{page, pageSize}}),
        createPlanSubscriptions: (id: string, options: PlanSubscriptionCreationOptions) => instance.post<ApiResponse<PlanSubscription>>(build(path, id, 'plan-subscriptions'), options),
        readActivePlanSubscription: (id: string) => instance.get<ApiResponse<PlanSubscription>>(build(path, id, 'plan-subscriptions', 'active')),
        readTransactions: (id: string, query?: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<Transaction>>(build(path, id, 'transactions'), {params:{query, page, pageSize}}),
        createDataRange: (id: string, options: DataRangeCreationOptions) => instance.post<ApiResponse<DataRange>>(build(path, id, 'data-ranges'), options),
        readDataRanges: (id: string) => instance.get<ApiResponse<Array<DataRange>>>(build(path, id, 'data-ranges')),
        readBillingItems: (id: string, query?: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<BillingItem>>(build(path, id, 'billing-items'), {params:{query, page, pageSize}}),
        readLabTests: (id: string, query?: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<LabTest>>(build(path, id, 'lab', 'tests'), {params:{query, page, pageSize}}),
        readServices: (id: string) => instance.get<ApiResponse<Array<ServiceCategory>>>(build(path, id, 'services')),
        createBillingItem: (id: string, options: BillingItemCreationOptions) => instance.post<ApiResponse<BillingItem>>(build(path, id, 'billing-items'), options),
        readActivityLogs: (id: string, query?: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<ActivityLog>>(build(path, id, 'activity'), {params:{query, page, pageSize}}),
        readInvoices: (id: string, query?: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<InvoiceLite>>(build(path, id, 'invoices'), {params:{query, page, pageSize}}),
    }
}

const invoices = () => {
    const path = 'invoices';

    return {
        create: (id: string, items: Array<InvoiceItemCreationOptions>) => instance.post<ApiResponse<Array<InvoiceItem>>>(build(path, id, 'items'), items),
        readById: (id: string) => instance.get<ApiResponse<Invoice>>(build(path, id)),
        settleInvoice: (id: string, options: InvoiceSettleOptions) => instance.put<ApiResponse<Invoice>>(build(path, id, 'settle'), options),
        deleteInvoiceItem: (id: string, itemId: string) => instance.delete<ApiResponse>(build(path, id, 'items', itemId)),
    }
}

const labs = () => {
    const path = 'labs';

    return {
        readLabTestByCode: (code: string) => instance.get<ApiResponse<LabTest>>(build(path, 'tests', code)),
        createLabTestResult: (id: string, options: LabTestResultCreationOptions) => instance.post<ApiResponse<LabTestResult>>(build(path, 'tests', id, 'results'), options),
        shareLabTest: (id: string) => instance.put<ApiResponse<LabTest>>(build(path, 'tests', id, 'share')),
        stopShareLabTest: (id: string) => instance.put<ApiResponse<LabTest>>(build(path, 'tests', id, 'stop-share')),
        updateLabScan: (id: string, options: LabScanUpdateOptions) => instance.patch<ApiResponse<LabScan>>(build(path, 'scans', id), options),
        updateLabTestResult: (id: string, resultId: string, options: LabTestResultUpdateOptions) => instance.patch<ApiResponse<LabTestResult>>(build(path, 'tests', id, 'results', resultId), options),
    }
}

const logs = () => {
    const path = 'logs';

    return {
        read: (page = 1, pageSize = 30, level?: LogLevel) => instance.get<PaginatedApiResponse<LogLite>>(build(path), {params:{page, pageSize, level}}),
        readById: (id: string) => instance.get<ApiResponse<Log>>(build(path, id)),
        deleteBy: (id: string) => instance.delete<ApiResponse>(build(path, id)),
        delete: (startDate?: string, endDate?: string) => instance.delete<ApiResponse>(build(path), {params:{startDate, endDate}}),
    }
}

const managers = () => {
    const path = 'managers';

    return {
        create: (options: ManagerCreationOptions) => instance.post<ApiResponse<Manager>>(build(path), options),
        readCurrent: () => instance.get<ApiResponse<Manager>>(build(path, 'current')),
        updateCurrent: (options: ManagerUpdateOptions) => instance.patch<ApiResponse<Manager>>(build(path, 'current'), options),
        delete: (id: string) => instance.delete<ApiResponse>(build(path, id)),
    }
}

const medics = () => {
    const path = 'medics';

    return {
        readCurrent: () => instance.get<ApiResponse<Medic>>(build(path, 'current')),
        updateCurrent: (options: MedicUpdateOptions) => instance.patch<ApiResponse<Medic>>(build(path, 'current'), options),
        readAppointmentsForCurrent: (status?: AppointmentStatus) => instance.get<ApiResponse<Array<Appointment>>>(build(path, 'current', 'appointments'), {params:{status}}),
        readAppointmentsByMedic: (id: string, status?: AppointmentStatus) => instance.get<ApiResponse<Array<Appointment>>>(build(path, id, 'appointments'), {params:{status}}),
        updateServices: (id: string, servicesIds: Array<string>) => instance.put<ApiResponse<Medic>>(build(path, id, 'services'), servicesIds),
        delete: (id: string) => instance.delete<ApiResponse>(build(path, id)),
    }
}

const medications = () => {
    const path = 'medications';

    return {
        delete: (id: string) => instance.delete<ApiResponse>(build(path, id)),
    }
}

const nonMedics = () => {
    const path = 'non-medics';

    return {
        readCurrent: () => instance.get<ApiResponse<NonMedic>>(build(path, 'current')),
        updateCurrent: (options: NonMedicUpdateOptions) => instance.patch<ApiResponse<NonMedic>>(build(path, 'current'), options),
        delete: (id: string) => instance.delete<ApiResponse>(build(path, id)),
    }
}

const notifications = () => {
    const path = 'notifications';

    return {
        readNotifications: (page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<Notification>>(build(path), {params:{page, pageSize}}),
    }
}

const patients = () => {
    const path = 'patients';

    return {
        readCurrent: () => instance.get<ApiResponse<Patient>>(build(path, 'current')),
        readGuestsForCurrent: () => instance.get<ApiResponse<Array<Guest>>>(build(path, 'current', 'guests')),
        createGuest: (options: GuestCreationOptions) => instance.post<ApiResponse<Guest>>(build(path, 'current', 'guests'), options),
        createAppointment: (options: AppointmentCreationOptions) => instance.post<ApiResponse<Appointment>>(build(path, 'current', 'appointments'), options),
        readAppointmentsForCurrent: (status?: AppointmentStatus) => instance.get<ApiResponse<Array<Appointment>>>(build(path, 'current', 'appointments'), {params:{status}}),
        readAppointmentsForPatient: (id: string, status?: AppointmentStatus) => instance.get<ApiResponse<Array<Appointment>>>(build(path, id, 'appointments'), {params:{status}}),
        createClinicalVisit: (id: string, type?: ClinicalVisitType) => instance.post<ApiResponse<ClinicalVisit>>(build(path, id, 'clinical-visits'), null, {params:{type}}),
        readClinicalVisitsForCurrent: () => instance.get<ApiResponse<Array<ClinicalVisit>>>(build(path, 'current', 'clinical-visits')),
        readClinicalVisitsForPatient: (id: string) => instance.get<ApiResponse<Array<ClinicalVisit>>>(build(path, id, 'clinical-visits')),
        createMedication: (id: string, options: MedicationCreationOptions) => instance.post<ApiResponse<Medication>>(build(path, id, 'medications'), options),
        readMedicationsForCurrent: () => instance.get<ApiResponse<Array<Medication>>>(build(path, 'current', 'medications')),
        readMedicationsForPatient: (id: string) => instance.get<ApiResponse<Array<Medication>>>(build(path, id, 'medications')),
        readTransactionsForCurrent: (page = 0, pageSize = 30, query?: string) => instance.get<PaginatedApiResponse<Transaction>>(build(path, 'current', 'transactions'), {params:{page, pageSize, query}}),
        readTransactionsForPatient: (id: string, page = 0, pageSize = 30, query?: string) => instance.get<PaginatedApiResponse<Transaction>>(build(path, id, 'transactions'), {params:{page, pageSize, query}}),
        readInvoicesForCurrent: (page = 0, pageSize = 30, query?: string) => instance.get<PaginatedApiResponse<InvoiceLite>>(build(path, 'current', 'invoices'), {params:{page, pageSize, query}}),
        readInvoicesForPatient: (id: string, page = 0, pageSize = 30, query?: string) => instance.get<PaginatedApiResponse<InvoiceLite>>(build(path, id, 'invoices'), {params:{page, pageSize, query}}),
        readLatestVitalReadingForCurrent: () => instance.get<ApiResponse<VitalReading>>(build(path, 'current', 'vital-readings', 'latest')),
        readLatestVitalReadingForPatient: (id: string) => instance.get<ApiResponse<VitalReading>>(build(path, id, 'vital-readings', 'latest')),
        readLabTestsForCurrent: () => instance.get<ApiResponse<Array<LabTest>>>(build(path, 'current', 'lab', 'tests')),
        readLabTestsForPatient: (id: string) => instance.get<ApiResponse<Array<LabTest>>>(build(path, id, 'lab', 'tests')),
        readLabScansForCurrent: () => instance.get<ApiResponse<Array<LabScan>>>(build(path, 'current', 'lab', 'scans')),
        readLabScansForPatient: (id: string) => instance.get<ApiResponse<Array<LabScan>>>(build(path, id, 'lab', 'scans')),
        readById: (id: string) => instance.get<ApiResponse<Patient>>(build(path, id)),
        updatePatient: (id: string, options: PatientUpdateOptions) => instance.patch<ApiResponse<Patient>>(build(path, id), options),
        updatePatientBiodata: (id: string, options: PatientBiodataUpdateOptions) => instance.patch<ApiResponse<PatientBiodata>>(build(path, id, 'biodata'), options),
        updatePatientSocialHistory: (id: string, options: PatientSocialHistoryUpdateOptions) => instance.patch<ApiResponse<PatientSocialHistory>>(build(path, id, 'social-history'), options),
        delete: (id: string) => instance.delete<ApiResponse>(build(path, id)),
    }
}

const paymentPlans = () => {
    const path = 'payment-plans';

    return {
        create: (options: PaymentPlanCreationOptions) => instance.post<ApiResponse<PaymentPlan>>(build(path), options),
        readPaymentPlans: () => instance.get<ApiResponse<Array<PaymentPlan>>>(build(path)),
        readPaymentPlanSubscriptions: (id: string) => instance.get<ApiResponse<Array<PlanSubscription>>>(build(path, id)),
        update: (id: string, options: PaymentPlanUpdateOptions) => instance.patch<ApiResponse<PaymentPlan>>(build(path, id), options),
        delete: (id: string) => instance.delete<ApiResponse>(build(path, id)),
    }
}

const planSubscriptions = () => {
    const path = 'plan-subscriptions';

    return {
        readPlanSubscriptions: (page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<PlanSubscription>>(build(path), {params:{page, pageSize}}),
        readActivePlanSubscriptions: (page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<PlanSubscription>>(build(path, 'active'), {params:{page, pageSize}}),
        cancel: (id: string) => instance.put<ApiResponse<PlanSubscription>>(build(path, id, 'cancel')),
    }
}

const roles = () => {
    const path = 'roles';

    return {
        readRoles: () => instance.get<ApiResponse<Array<Role>>>(build(path)),
        updateRole: (roleId: string, dto: Role) => instance.put<ApiResponse<Role>>(build(path, roleId), dto),
    }
}

const serviceCategories = () => {
    const path = 'service-categories';

    return {
        read: () => instance.get<ApiResponse<Array<ServiceCategory>>>(build(path)),
        create: (dto: ServiceCategoryCreationOptions) => instance.post<ApiResponse<ServiceCategory>>(build(path), dto),
        delete: (id: string) => instance.delete<ApiResponse>(build(path, id)),
    }
}

const settings = () => {
    const path = 'settings';

    return {
        readAll: () => instance.get<ApiResponse<Array<Setting>>>(build(path)),
        readAppVersion: () => instance.get<ApiResponse<string>>(build(path, 'app-version')),
        addOrUpdate: (dto: Setting) => instance.post<ApiResponse<Setting>>(build(path), dto),
    }
}

const statistics = () => {
    const path = 'statistics';

    return {
        readHospitalClinicalVisitsStats: (options: HospitalStatsOptions) => instance.get<ApiResponse<HospitalClinicalVisitsStats>>(build(path, 'clinical-visits'), {params:{...options}}),
        readHospitalPatientsStats: (options: HospitalStatsOptions) => instance.get<ApiResponse<HospitalPatientsStats>>(build(path, 'patients'), {params:{...options}}),
        readHospitalInvoiceStats: (options: HospitalStatsOptions) => instance.get<ApiResponse<HospitalInvoiceStats>>(build(path, 'invoices'), {params:{...options}}),
        readHospitalActivityStats: (options: HospitalStatsOptions) => instance.get<ApiResponse<HospitalPlottableStats>>(build(path, 'activity'), {params:{...options}}),
        readHospitalTransactionsStats: (options: HospitalStatsOptions) => instance.get<ApiResponse<HospitalPlottableStats>>(build(path, 'transactions'), {params:{...options}}),
    }
}

const storage = () => {
    const path = 'storage';

    return {
        upload: (resource: IFormFile) => instance.post<ApiResponse<Resource>>(build(path), resource),
        delete: (dto: Resource) => instance.delete<ApiResponse>(build(path)),
        deleteMultiple: (dto: Array<Resource>) => instance.delete<ApiResponse>(build(path, 'multiple')),
    }
}

const users = () => {
    const path = 'users';

    return {
        readUsers: (query?: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<UserLite>>(build(path), {params:{query, page, pageSize}}),
        export: (page = 1, pageSize = 30, query?: string) => instance.get<ApiResponse>(build(path, 'export'), {params:{page, pageSize, query}}),
        exportAll: () => instance.get<ApiResponse>(build(path, 'export', 'all')),
        readUserProfileById: (userId: string) => instance.get<ApiResponse<User>>(build(path, userId)),
        deleteUser: (userId: string, mode?: DeleteMode) => instance.delete<ApiResponse>(build(path, userId), {params:{mode}}),
        activateUser: (userId: string) => instance.put<ApiResponse>(build(path, userId, 'activate')),
        dectivateUser: (userId: string) => instance.put<ApiResponse>(build(path, userId, 'deactivate')),
        setupUser: (password: string) => instance.put<ApiResponse<User>>(build(path, 'setup', password)),
        readCurrentUserProfile: () => instance.get<ApiResponse<User>>(build(path, 'profile')),
        readCurrentUserCalendarEvents: (startDate: string, endDate: string) => instance.get<ApiResponse<Array<CalendarEvent>>>(build(path, 'current', 'calendar-events', startDate, endDate)),
        readCalendarEventsByUser: (id: string, startDate: string, endDate: string) => instance.get<ApiResponse<Array<CalendarEvent>>>(build(path, id, 'calendar-events', startDate, endDate)),
        updateUserProfile: (dto: UpdatedUser) => instance.patch<ApiResponse<User>>(build(path, 'profile'), dto),
        updateUserPassword: (password: string) => instance.put<ApiResponse<AuthResponse>>(build(path, 'profile', 'password'), null, {params:{password}}),
        updateRoles: (userId: string, roles: Array<UserRoleType>) => instance.put<ApiResponse<Array<Role>>>(build(path, userId, 'roles'), roles),
    }
}

const userPreferences = () => {
    const path = 'user-preferences';

    return {
        readUserPreferences: () => instance.get<ApiResponse<UserPreference>>(build(path)),
        updateUserPreferences: (dto: UserPreference) => instance.put<ApiResponse<UserPreference>>(build(path), dto),
    }
}

const utilities = () => {
    const path = 'utilities';

    return {
        dispatchEvent: (eventDto: Event) => instance.post<ApiResponse>(build(path, 'notification'), eventDto),
        sendEmail: (emailDto: Mailing) => instance.post<ApiResponse>(build(path, 'mail'), emailDto),
        readEmailTemplates: () => instance.get<ApiResponse<MailTemplate[]>>(build(path, 'mail-templates')),
    }
}

export const api = {
    appointments,
    auth,
    billingItems,
    calendarEvents,
    chats,
    clinicalVisits,
    currencies,
    dataRanges,
    encounters,
    guests,
    health,
    hospitals,
    invoices,
    labs,
    logs,
    managers,
    medics,
    medications,
    nonMedics,
    notifications,
    patients,
    paymentPlans,
    planSubscriptions,
    roles,
    serviceCategories,
    settings,
    statistics,
    storage,
    users,
    userPreferences,
    utilities,
}