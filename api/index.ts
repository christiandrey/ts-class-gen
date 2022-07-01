const apartments = () => {
    const path = 'apartments';

    return {
        create: (options: ApartmentCreationOptions) => instance.post<ApiResponse<Apartment>>(build(path), options),
        readCurrent: () => instance.get<ApiResponse<Apartment>>(build(path, 'current')),
        readById: (id: string) => instance.get<ApiResponse<Apartment>>(build(path, id)),
        readAll: (query?: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<ApartmentLite>>(build(path), {params:{query, page, pageSize}}),
        update: (id: string, options: ApartmentUpdateOptions) => instance.patch<ApiResponse<Apartment>>(build(path, id), options),
        delete: (id: string) => instance.delete<ApiResponse>(build(path, id)),
    }
}

const apartmentTypes = () => {
    const path = 'apartment-types';

    return {
        create: (dto: ApartmentTypeCreationOptions) => instance.post<ApiResponse<ApartmentType>>(build(path), dto),
        readById: (id: string) => instance.get<ApiResponse<ApartmentType>>(build(path, id)),
        readAll: (query?: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<ApartmentType>>(build(path), {params:{query, page, pageSize}}),
        update: (id: string, dto: ApartmentTypeUpdateOptions) => instance.patch<ApiResponse<ApartmentType>>(build(path, id), dto),
        updateServices: (id: string, servicesIds: Array<string>) => instance.put<ApiResponse<ApartmentType>>(build(path, id, 'services'), servicesIds),
        onboardFromCsv: (id: string, resource: IFormFile) => instance.post<ApiResponse<Array<OnboardedUser>>>(build(path, id, 'onboard'), resource),
        updateServiceCharge: (id: string, dto: ServiceChargeUpdateOptions) => instance.put<ApiResponse<ApartmentType>>(build(path, id, 'service-charge'), dto),
        delete: (id: string) => instance.delete<ApiResponse>(build(path, id)),
    }
}

const auth = () => {
    const path = 'auth';

    return {
        createUser: (dto: Register) => instance.post<ApiResponse<AuthResponse>>(build(path, 'register'), dto),
        authenticateUser: (dto: Authenticate) => instance.post<ApiResponse<AuthResponse>>(build(path, 'login'), dto),
        verifyEmail: (dto: VerifyEmail) => instance.post<ApiResponse>(build(path, 'verifications', 'email'), dto),
        resendEmail: (email: string) => instance.post<ApiResponse>(build(path, 'verifications', 'email', 'resend'), null, {params:{email}}),
        refreshToken: (refreshToken: string) => instance.post<ApiResponse<AuthResponse>>(build(path, 'refresh'), null, {params:{refreshToken}}),
        forgotPassword: (email: string) => instance.post<ApiResponse>(build(path, 'passwords', 'forgot'), null, {params:{email}}),
        resetPassword: (dto: ResetPassword) => instance.post<ApiResponse<AuthResponse>>(build(path, 'passwords', 'reset'), dto),
        verifyResetPasswordCode: (dto: VerifyResetCode) => instance.post<ApiResponse>(build(path, 'passwords', 'reset', 'verify'), dto),
    }
}

const bankAccounts = () => {
    const path = 'bank-accounts';

    return {
        readBankAccounts: () => instance.get<ApiResponse<Array<BankAccount>>>(build(path)),
        createBankAccount: (dto: BankAccountCreationOptions) => instance.post<ApiResponse<BankAccount>>(build(path), dto),
        withdrawToBankAccount: (bankAccountId: string, localAmount: number) => instance.post<ApiResponse<Transaction>>(build(path, bankAccountId, 'withdraw', localAmount)),
        deleteBankAccount: (bankAccountId: string) => instance.delete<ApiResponse>(build(path, bankAccountId)),
    }
}

const cards = () => {
    const path = 'cards';

    return {
        readCards: () => instance.get<ApiResponse<Array<Card>>>(build(path)),
        resolveCard: (bin: string) => instance.get<ApiResponse<ResolvedCard>>(build(path, 'resolve', bin)),
        createCard: (dto: CardCreationOptions) => instance.post<ApiResponse<Card>>(build(path), dto),
        fundWalletFromCard: (cardId: string, localAmount: number) => instance.post<ApiResponse<Transaction>>(build(path, cardId, 'fund', localAmount)),
        withdrawToCard: (cardId: string, localAmount: number) => instance.post<ApiResponse<Transaction>>(build(path, cardId, 'withdraw', localAmount)),
        deleteCard: (cardId: string) => instance.delete<ApiResponse>(build(path, cardId)),
    }
}

const communities = () => {
    const path = 'communities';

    return {
        createCategory: (dto: CommunityCategoryCreationOptions) => instance.post<ApiResponse<CommunityCategory>>(build(path, 'categories'), dto),
        createTopic: (dto: CommunityTopicCreationOptions) => instance.post<ApiResponse<CommunityTopic>>(build(path, 'topics'), dto),
        readTopicById: (topicId: string) => instance.get<ApiResponse<CommunityTopic>>(build(path, 'topics', topicId)),
        createComment: (topicId: string, dto: CommunityCommentCreationOptions) => instance.post<ApiResponse<CommunityComment>>(build(path, 'topics', topicId, 'comments'), dto),
        readTopicComments: (topicId: string) => instance.get<ApiResponse<Array<CommunityComment>>>(build(path, 'topics', topicId, 'comments')),
        readTopicCommentById: (topicId: string, commentId: string) => instance.get<ApiResponse<CommunityComment>>(build(path, 'topics', topicId, 'comments', commentId)),
        deleteCategory: (categoryId: string) => instance.delete<ApiResponse>(build(path, 'categories', categoryId)),
        deleteTopic: (topicId: string) => instance.delete<ApiResponse>(build(path, 'topics', topicId)),
        deleteComment: (topicId: string, commentId: string) => instance.delete<ApiResponse>(build(path, 'topics', topicId, 'comments', commentId)),
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

const estates = () => {
    const path = 'estates';

    return {
        create: (dto: EstateCreationOptions) => instance.post<ApiResponse<Estate>>(build(path), dto),
        readById: (id: string) => instance.get<ApiResponse<Estate>>(build(path, id)),
        readAll: (query?: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<EstateLite>>(build(path), {params:{query, page, pageSize}}),
        readCommunityCategories: (id: string) => instance.get<ApiResponse<Array<CommunityCategory>>>(build(path, id, 'community', 'categories')),
        readVendors: (id: string) => instance.get<ApiResponse<Array<VendorLite>>>(build(path, id, 'vendors')),
        readWalletBalance: (id: string) => instance.get<ApiResponse<number>>(build(path, id, 'wallet-balance')),
        readPayments: (id: string, query?: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<PaymentLite>>(build(path, id, 'payments'), {params:{query, page, pageSize}}),
        readPaymentRequests: (id: string, query?: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<PaymentRequestLite>>(build(path, id, 'payment-requests'), {params:{query, page, pageSize}}),
        readRecurringPayments: (id: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<RecurringPayment>>(build(path, id, 'payments', 'recurring'), {params:{page, pageSize}}),
        readPaymentBeneficiaries: (id: string) => instance.get<ApiResponse<Array<PaymentBeneficiary>>>(build(path, id, 'payments', 'beneficiaries')),
        createPaymentBeneficiary: (id: string, dto: PaymentBeneficiaryCreationOptions) => instance.post<ApiResponse<PaymentBeneficiary>>(build(path, id, 'payments', 'beneficiaries'), dto),
        addPaymentBeneficiary: (id: string, beneficiaryId: string) => instance.put<ApiResponse<PaymentBeneficiary>>(build(path, id, 'payments', 'beneficiaries', beneficiaryId)),
        removePaymentBeneficiary: (id: string, beneficiaryId: string) => instance.delete<ApiResponse<PaymentBeneficiary>>(build(path, id, 'payments', 'beneficiaries', beneficiaryId)),
        createPayment: (id: string, dto: PaymentCreationOptions, serviceCategoryId?: string, beneficiaryId?: string) => instance.post<ApiResponse<Payment>>(build(path, id, 'payments'), dto, {params:{serviceCategoryId, beneficiaryId}}),
        createPaymentRequest: (id: string, dto: PaymentCreationOptions, serviceCategoryId?: string, beneficiaryId?: string) => instance.post<ApiResponse<PaymentRequest>>(build(path, id, 'payment-requests'), dto, {params:{serviceCategoryId, beneficiaryId}}),
        readFacilityManager: (id: string) => instance.get<ApiResponse<FacilityManager>>(build(path, id, 'facility-manager')),
        readFacilityManagerLogs: (id: string) => instance.get<ApiResponse<Array<FacilityManagerLog>>>(build(path, id, 'facility-manager', 'logs')),
        delete: (id: string) => instance.delete<ApiResponse>(build(path, id)),
        update: (id: string, dto: EstateUpdateOptions) => instance.patch<ApiResponse<Estate>>(build(path, id), dto),
        updateFacilityManager: (id: string, facilityManagerId: string) => instance.put<ApiResponse<Estate>>(build(path, id, 'facility-manager', facilityManagerId)),
        updateVendors: (id: string, vendorIds: Array<string>) => instance.put<ApiResponse<Estate>>(build(path, id, 'vendors'), vendorIds),
        updateServices: (id: string, servicesIds: Array<string>) => instance.put<ApiResponse<Estate>>(build(path, id, 'services'), servicesIds),
        updateCommission: (id: string, dto: CommissionUpdateOptions) => instance.patch<ApiResponse<Estate>>(build(path, id, 'commission'), dto),
        readResidents: (id: string) => instance.get<ApiResponse<Array<ResidentLite>>>(build(path, id, 'residents')),
        readApartments: (id: string) => instance.get<ApiResponse<Array<ApartmentLite>>>(build(path, id, 'apartments')),
        readProjects: (id: string, projectQuery: ProjectQuery, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<ProjectLite>>(build(path, id, 'projects'), {params:{...projectQuery, page, pageSize}}),
        readPublicProjects: (id: string, projectQuery: ProjectQuery, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<ProjectLite>>(build(path, id, 'projects', 'public'), {params:{...projectQuery, page, pageSize}}),
        exportPayments: (id: string, startDate?: string, endDate?: string) => instance.get<ApiResponse>(build(path, id, 'payments', 'export'), {params:{startDate, endDate}}),
    }
}

const facilityManagers = () => {
    const path = 'facility-managers';

    return {
        create: () => instance.post<ApiResponse<FacilityManager>>(build(path)),
        readCurrent: () => instance.get<ApiResponse<FacilityManager>>(build(path, 'current')),
        readById: (id: string) => instance.get<ApiResponse<FacilityManager>>(build(path, id)),
        readAll: (query?: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<FacilityManager>>(build(path), {params:{query, page, pageSize}}),
        readVendorInvitations: () => instance.get<ApiResponse<Array<VendorInvitation>>>(build(path, 'current', 'vendor-invitations')),
        readPaymentBeneficiaries: () => instance.get<ApiResponse<Array<PaymentBeneficiary>>>(build(path, 'current', 'payments', 'beneficiaries')),
        readResidentInvitations: () => instance.get<ApiResponse<Array<ResidentInvitation>>>(build(path, 'current', 'resident-invitations')),
        readProjects: (projectQuery: ProjectQuery, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<ProjectLite>>(build(path, 'current', 'projects'), {params:{...projectQuery, page, pageSize}}),
        readEstates: () => instance.get<ApiResponse<Array<EstateLite>>>(build(path, 'current', 'estates')),
        readFacilityManagerEstates: (id: string) => instance.get<ApiResponse<Array<EstateLite>>>(build(path, id, 'estates')),
        readWalletBalance: () => instance.get<ApiResponse<number>>(build(path, 'current', 'estates', 'wallet-balance')),
    }
}

const faqCategories = () => {
    const path = 'faq-categories';

    return {
        readAllCategories: (query?: string) => instance.get<ApiResponse<FaqCategory>>(build(path), {params:{query}}),
        readFaqCategoryById: (categoryId: string) => instance.get<ApiResponse<FaqCategory>>(build(path, categoryId)),
        createFaqCategory: (creationOptions: FaqCategoryCreationOptions) => instance.post<ApiResponse<FaqCategory>>(build(path), creationOptions),
        updateFaqCategory: (categoryId: string, creationOptions: FaqCategoryCreationOptions) => instance.put<ApiResponse<FaqCategory>>(build(path, categoryId), creationOptions),
        deleteFaqCategory: (categoryId: string) => instance.delete<ApiResponse>(build(path, categoryId)),
    }
}

const faqs = () => {
    const path = 'faqs';

    return {
        readAllFaqs: (query?: string, page = 1, pageSize = 30, categoryId?: string) => instance.get<PaginatedApiResponse<Faq>>(build(path), {params:{query, page, pageSize, categoryId}}),
        readFaqById: (faqId: string) => instance.get<ApiResponse<Faq>>(build(path, faqId)),
        createFaq: (creationOptions: FaqCreationOptions) => instance.post<ApiResponse<Faq>>(build(path), creationOptions),
        updateFaq: (faqId: string, creationOptions: FaqCreationOptions) => instance.put<ApiResponse<Faq>>(build(path, faqId), creationOptions),
        deleteFaq: (faqId: string) => instance.delete<ApiResponse>(build(path, faqId)),
    }
}

const ghosts = () => {
    const path = 'ghosts';

    return {
        readCurrent: () => instance.get<ApiResponse<Ghost>>(build(path, 'current')),
        readById: (id: string) => instance.get<ApiResponse<Ghost>>(build(path, id)),
        readAll: (query?: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<Ghost>>(build(path), {params:{query, page, pageSize}}),
    }
}

const health = () => {
    const path = 'health';

    return {
        checkHealth: () => instance.get<ApiResponse>(build(path)),
        checkDatabaseHealth: () => instance.get<ApiResponse>(build(path, 'database')),
        checkMailProviderHealth: () => instance.get<ApiResponse>(build(path, 'emails')),
        checkMessagingProviderHealth: () => instance.get<ApiResponse>(build(path, 'messaging')),
    }
}

const hooks = () => {
    const path = 'hooks';

    return {
        onPaystackTransferEvent: (transferEvent: PaystackTransferEventData) => instance.post<ApiResponse>(build(path, 'paystack', 'transfer'), transferEvent),
    }
}

const invitations = () => {
    const path = 'invitations';

    return {
        createVendorInvitation: (dto: VendorInvitationCreationOptions) => instance.post<ApiResponse<VendorInvitation>>(build(path, 'vendors'), dto),
        createResidentInvitation: (dto: ResidentInvitationCreationOptions) => instance.post<ApiResponse<ResidentInvitation>>(build(path, 'residents'), dto),
        checkEmail: (email: string) => instance.post<ApiResponse<Invitation>>(build(path, 'check'), null, {params:{email}}),
        acceptResidentInvitation: (id: string) => instance.post<ApiResponse<Resident>>(build(path, 'residents', id, 'accept')),
        resendVendorInvitation: (id: string) => instance.post<ApiResponse>(build(path, 'vendors', id, 'resend')),
        resendResidentInvitation: (id: string) => instance.post<ApiResponse>(build(path, 'residents', id, 'resend')),
        deleteVendorInvitation: (id: string) => instance.delete<ApiResponse>(build(path, 'vendors', id)),
        deleteResidentInvitation: (id: string) => instance.delete<ApiResponse>(build(path, 'residents', id)),
    }
}

const locations = () => {
    const path = 'locations';

    return {
        readCountries: (page = 1, pageSize = 30, query?: string) => instance.get<PaginatedApiResponse<Country>>(build(path, 'countries'), {params:{page, pageSize, query}}),
        readActiveCountries: () => instance.get<ApiResponse<Array<Country>>>(build(path, 'countries', 'active')),
        updateCountry: (id: string, updatedCountryDto: UpdatedCountry) => instance.put<ApiResponse<Country>>(build(path, 'countries', id), updatedCountryDto),
        readCountry: (id: string) => instance.get<ApiResponse<Country>>(build(path, 'countries', id)),
        activateCountry: (id: string) => instance.put<ApiResponse<Country>>(build(path, 'countries', id, 'activate')),
        deactivateCountry: (id: string) => instance.put<ApiResponse<Country>>(build(path, 'countries', id, 'deactivate')),
        readStatesByCountry: (id: string, page = 1, pageSize = 30, query?: string) => instance.get<PaginatedApiResponse<State>>(build(path, 'countries', id, 'states'), {params:{page, pageSize, query}}),
        readStates: (page = 1, pageSize = 30, query?: string) => instance.get<PaginatedApiResponse<State>>(build(path, 'states'), {params:{page, pageSize, query}}),
        updateState: (id: string, updatedStateDto: UpdatedState) => instance.put<ApiResponse<State>>(build(path, 'states', id), updatedStateDto),
        activateState: (id: string) => instance.put<ApiResponse<State>>(build(path, 'states', id, 'activate')),
        deactivateState: (id: string) => instance.put<ApiResponse<State>>(build(path, 'states', id, 'deactivate')),
        geocodeAddressByPlaceId: (placeId: string) => instance.get<ApiResponse<Location>>(build(path, 'geocode', placeId)),
        geocodeAddressByLocation: (latitude: number, longitude: number) => instance.get<ApiResponse<Location>>(build(path, 'geocode', latitude, longitude)),
        readDirections: (placeIds: Array<string>) => instance.post<ApiResponse<GeoCoordinates>>(build(path, 'directions'), placeIds),
        readPolylineDirections: (placeIds: Array<string>) => instance.post<ApiResponse<Polyline>>(build(path, 'directions', 'polyline'), placeIds),
        geolocate: () => instance.get<ApiResponse<Location>>(build(path, 'geolocate')),
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

const members = () => {
    const path = 'members';

    return {
        readCurrent: () => instance.get<ApiResponse<Member>>(build(path, 'current')),
        readById: (id: string) => instance.get<ApiResponse<Member>>(build(path, id)),
        readPaymentRequests: (id: string, query?: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<PaymentRequestLite>>(build(path, id, 'payment-requests'), {params:{query, page, pageSize}}),
        updateRole: (id: string, dto: MemberRoleTypeUpdateOptions) => instance.put<ApiResponse<Member>>(build(path, id, 'role'), dto),
        updatePaymentLimit: (id: string, paymentLimit: number) => instance.put<ApiResponse<Member>>(build(path, id, 'payment-limit', paymentLimit)),
        updatePermissions: (id: string, dto: MemberPermissionUpdateOptions) => instance.patch<ApiResponse<Member>>(build(path, id, 'permissions'), dto),
        delete: (id: string) => instance.delete<ApiResponse>(build(path, id)),
    }
}

const notifications = () => {
    const path = 'notifications';

    return {
        readNotifications: (page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<Notification>>(build(path), {params:{page, pageSize}}),
    }
}

const organizations = () => {
    const path = 'organizations';

    return {
        create: (dto: OrganizationCreationOptions) => instance.post<ApiResponse<Organization>>(build(path), dto),
        readCurrentOrganization: () => instance.get<ApiResponse<Organization>>(build(path, 'current')),
        readById: (id: string) => instance.get<ApiResponse<Organization>>(build(path, id)),
        update: (id: string, dto: OrganizationUpdateOptions) => instance.patch<ApiResponse<Organization>>(build(path, id), dto),
        readPaymentRequests: (id: string, query?: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<PaymentRequestLite>>(build(path, id, 'payment-requests'), {params:{query, page, pageSize}}),
        readEstates: (id: string) => instance.get<ApiResponse<Array<EstateLite>>>(build(path, id, 'estates')),
        readWalletBalance: (id: string) => instance.get<ApiResponse<number>>(build(path, id, 'wallet-balance')),
        fundOrganizationWallet: (id: string, localAmount: number) => instance.post<ApiResponse<Transaction>>(build(path, id, 'wallet', 'fund', localAmount)),
        createMember: (id: string, dto: MemberCreationOptions) => instance.post<ApiResponse<Member>>(build(path, id, 'members'), dto),
        inviteMember: (id: string, dto: MemberInvitationOptions) => instance.post<ApiResponse<Member>>(build(path, id, 'members', 'invite'), dto),
    }
}

const paymentRequests = () => {
    const path = 'payment-requests';

    return {
        readById: (id: string) => instance.get<ApiResponse<PaymentRequest>>(build(path, id)),
        approvePaymentRequest: (id: string) => instance.put<ApiResponse<PaymentRequest>>(build(path, id, 'approve')),
        rejectPaymentRequest: (id: string) => instance.put<ApiResponse<PaymentRequest>>(build(path, id, 'reject')),
    }
}

const payments = () => {
    const path = 'payments';

    return {
        createPayment: (dto: PaymentCreationOptions) => instance.post<ApiResponse<Payment>>(build(path), dto),
        createServiceChargePayment: (localAmount: number) => instance.post<ApiResponse<Payment>>(build(path, 'service-charge', localAmount)),
        readPaymentsByUser: (page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<Payment>>(build(path), {params:{page, pageSize}}),
        readPaymentId: (id: string) => instance.get<ApiResponse<Payment>>(build(path, id)),
        readSummaryByUser: () => instance.get<ApiResponse<PaymentSummary>>(build(path, 'summary')),
        readPayments: (query?: string, page = 1, pageSize = 30, userId?: string) => instance.get<PaginatedApiResponse<Payment>>(build(path, 'all'), {params:{query, page, pageSize, userId}}),
        updateEvidenceUrl: (id: string, dto: PaymentUpdateOptions) => instance.put<ApiResponse<Payment>>(build(path, id, 'evidence'), dto),
        deletePaymentBeneficiary: (id: string) => instance.delete<ApiResponse>(build(path, 'beneficiaries', id)),
    }
}

const projects = () => {
    const path = 'projects';

    return {
        create: (dto: ProjectCreationOptions) => instance.post<ApiResponse<Project>>(build(path), dto),
        createMessage: (id: string, dto: ProjectMessageCreationOptions) => instance.post<ApiResponse<ProjectMessage>>(build(path, id, 'messages'), dto),
        readById: (id: string) => instance.get<ApiResponse<Project>>(build(path, id)),
        readMessages: (id: string) => instance.get<ApiResponse<Array<ProjectMessage>>>(build(path, id, 'messages')),
        readMessageById: (id: string, projectMessageId: string) => instance.get<ApiResponse<ProjectMessage>>(build(path, id, 'messages', projectMessageId)),
        readAll: (projectQuery: ProjectQuery, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<ProjectLite>>(build(path), {params:{...projectQuery, page, pageSize}}),
        assignVendor: (id: string, vendorId: string) => instance.put<ApiResponse<Project>>(build(path, id, 'assign', vendorId)),
        updateStatus: (id: string, dto: ProjectStatusUpdate) => instance.put<ApiResponse<Project>>(build(path, id, 'status'), dto),
        makePayment: (id: string, localAmount: number) => instance.post<ApiResponse<Project>>(build(path, id, 'pay', localAmount)),
        review: (id: string, dto: ReviewOptions) => instance.post<ApiResponse<Review>>(build(path, id, 'review'), dto),
        delete: (id: string) => instance.delete<ApiResponse>(build(path, id)),
    }
}

const recurringPayments = () => {
    const path = 'recurring-payments';

    return {
        readRecurringPaymentsByUser: (page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<RecurringPayment>>(build(path), {params:{page, pageSize}}),
        readRecurringPaymentss: (query?: string, page = 1, pageSize = 30, userId?: string) => instance.get<PaginatedApiResponse<RecurringPayment>>(build(path, 'all'), {params:{query, page, pageSize, userId}}),
        executeRecurringPayment: (id: string) => instance.post<ApiResponse<Payment>>(build(path, id, 'execute')),
        deleteRecurringPayment: (id: string) => instance.delete<ApiResponse>(build(path, id)),
    }
}

const residents = () => {
    const path = 'residents';

    return {
        create: () => instance.post<ApiResponse<Array<Resident>>>(build(path)),
        readCurrent: () => instance.get<ApiResponse<Resident>>(build(path, 'current')),
        readById: (id: string) => instance.get<ApiResponse<Resident>>(build(path, id)),
        readAll: (query?: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<ResidentLite>>(build(path), {params:{query, page, pageSize}}),
        update: (id: string, dto: ResidentUpdateOptions) => instance.patch<ApiResponse<Resident>>(build(path, id), dto),
        readProjects: (projectQuery: ProjectQuery, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<ProjectLite>>(build(path, 'current', 'projects'), {params:{...projectQuery, page, pageSize}}),
        readProjectsByResident: (projectQuery: ProjectQuery, id: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<ProjectLite>>(build(path, id, 'projects'), {params:{...projectQuery, page, pageSize}}),
        readPayments: (id: string, query?: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<PaymentLite>>(build(path, id, 'payments'), {params:{query, page, pageSize}}),
        createOfflineServiceChargePayment: (id: string, localAmount: number) => instance.post<ApiResponse<Payment>>(build(path, id, 'payments', 'service-charge', localAmount)),
        deleteResident: (id: string) => instance.delete<ApiResponse>(build(path, id)),
        offboardResident: (id: string) => instance.delete<ApiResponse>(build(path, id, 'offboard')),
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
        addOrUpdate: (setting: Setting) => instance.post<ApiResponse<Setting>>(build(path), setting),
    }
}

const statistics = () => {
    const path = 'statistics';

    return {
        readNumberOfUnitsStats: (startDate?: string, endDate?: string) => instance.get<ApiResponse<Stat>>(build(path, 'units'), {params:{startDate, endDate}}),
        readNumberOfFacilityManagersStats: (startDate?: string, endDate?: string) => instance.get<ApiResponse<Stat>>(build(path, 'facility-managers'), {params:{startDate, endDate}}),
        readPaymentsProcessedStats: (startDate?: string, endDate?: string) => instance.get<ApiResponse<Stat>>(build(path, 'payments'), {params:{startDate, endDate}}),
        readRevenueStats: (startDate?: string, endDate?: string) => instance.get<ApiResponse<Stat>>(build(path, 'revenue'), {params:{startDate, endDate}}),
        readActiveUnitsCount: () => instance.get<ApiResponse<number>>(build(path, 'units', 'active')),
        readActiveFacilityManagersCount: () => instance.get<ApiResponse<number>>(build(path, 'facility-managers', 'active')),
        readTotalRevenue: () => instance.get<ApiResponse<number>>(build(path, 'revenue', 'total')),
        readTotalNumberOfUnits: () => instance.get<ApiResponse<number>>(build(path, 'units', 'total')),
        readTotalPaymentsProcessed: () => instance.get<ApiResponse<number>>(build(path, 'payments', 'total')),
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

const transactions = () => {
    const path = 'transactions';

    return {
        readTransactionsByUser: (page = 1, pageSize = 30, query?: string, startDate?: string, endDate?: string) => instance.get<PaginatedApiResponse<Transaction>>(build(path), {params:{page, pageSize, query, startDate, endDate}}),
        readTransactions: (query?: string, page = 1, pageSize = 30, userId?: string) => instance.get<PaginatedApiResponse<Transaction>>(build(path, 'all'), {params:{query, page, pageSize, userId}}),
    }
}

const users = () => {
    const path = 'users';

    return {
        readUsers: (query?: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<UserLite>>(build(path), {params:{query, page, pageSize}}),
        export: (page: number, pageSize: number, query?: string) => instance.get<ApiResponse>(build(path, 'export'), {params:{page, pageSize, query}}),
        export: () => instance.get<ApiResponse>(build(path, 'export', 'all')),
        readUserProfile: (userId: string) => instance.get<ApiResponse<User>>(build(path, userId)),
        readUserAccounts: (userId: string) => instance.get<ApiResponse<UserAccounts>>(build(path, userId, 'accounts')),
        deleteUser: (userId: string) => instance.delete<ApiResponse>(build(path, userId)),
        deleteCurrentUser: () => instance.delete<ApiResponse>(build(path)),
        activateUser: (userId: string) => instance.put<ApiResponse>(build(path, userId, 'activate')),
        deactivateUser: (userId: string) => instance.put<ApiResponse>(build(path, userId, 'deactivate')),
        readUserProfile: () => instance.get<ApiResponse<User>>(build(path, 'profile')),
        updateUserProfile: (dto: UpdatedUser) => instance.patch<ApiResponse<User>>(build(path, 'profile'), dto),
        updateUserActiveAccount: (dto: UserCurrentAccount) => instance.patch<ApiResponse<User>>(build(path, 'current', 'accounts', 'active'), dto),
        readUserAccounts: () => instance.get<ApiResponse<UserAccounts>>(build(path, 'current', 'accounts')),
        updateUserPassword: (password: string) => instance.put<ApiResponse<AuthResponse>>(build(path, 'profile', 'password'), null, {params:{password}}),
        updateRoles: (userId: string, roles: Array<UserRoleType>) => instance.put<ApiResponse<Array<Role>>>(build(path, userId, 'roles'), roles),
    }
}

const utilities = () => {
    const path = 'utilities';

    return {
        dispatchEvent: (eventDto: Event) => instance.post<ApiResponse>(build(path, 'notification'), eventDto),
        sendEmail: (emailDto: Mailing) => instance.post<ApiResponse>(build(path, 'mail'), emailDto),
        sendMessage: (messagingDto: Messaging) => instance.post<ApiResponse>(build(path, 'message'), messagingDto),
        readEmailTemplates: () => instance.get<ApiResponse<MailTemplate[]>>(build(path, 'mail-templates')),
    }
}

const vendors = () => {
    const path = 'vendors';

    return {
        create: (dto: VendorCreationOptions) => instance.post<ApiResponse<Vendor>>(build(path), dto),
        readCurrent: () => instance.get<ApiResponse<Vendor>>(build(path, 'current')),
        readById: (id: string) => instance.get<ApiResponse<Vendor>>(build(path, id)),
        readAll: (query?: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<VendorLite>>(build(path), {params:{query, page, pageSize}}),
        readProjects: (projectQuery: ProjectQuery, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<ProjectLite>>(build(path, 'current', 'projects'), {params:{...projectQuery, page, pageSize}}),
        readProjectsByVendor: (id: string, projectQuery: ProjectQuery, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<ProjectLite>>(build(path, id, 'projects'), {params:{...projectQuery, page, pageSize}}),
        readReviews: (id: string) => instance.get<ApiResponse<Array<Review>>>(build(path, id, 'reviews')),
    }
}

const wallets = () => {
    const path = 'wallets';

    return {
        readWallet: () => instance.get<ApiResponse<Wallet>>(build(path)),
        readUserWallet: (userId: string) => instance.get<ApiResponse<Wallet>>(build(path, userId)),
        creditUserWallet: (userId: string, amount: number) => instance.put<ApiResponse<Wallet>>(build(path, userId, 'credit'), null, {params:{amount}}),
        debitUserWallet: (userId: string, amount: number) => instance.put<ApiResponse<Wallet>>(build(path, userId, 'debit'), null, {params:{amount}}),
        lockUserWallet: (userId: string, amount: number) => instance.put<ApiResponse<Wallet>>(build(path, userId, 'lock'), null, {params:{amount}}),
        unlockUserWallet: (userId: string, amount: number) => instance.put<ApiResponse<Wallet>>(build(path, userId, 'unlock'), null, {params:{amount}}),
    }
}

const withdrawals = () => {
    const path = 'withdrawals';

    return {
        readWithdrawalsByUser: (page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<Withdrawal>>(build(path), {params:{page, pageSize}}),
        readWithdrawals: (query?: string, page = 1, pageSize = 30) => instance.get<PaginatedApiResponse<AdminWithdrawal>>(build(path, 'all'), {params:{query, page, pageSize}}),
        fixEstates: () => instance.put<ApiResponse>(build(path, 'fix-estates')),
        readWithdrawalSummary: () => instance.get<ApiResponse<WithdrawalSummary>>(build(path, 'summary')),
        cancelWithdrawal: (id: string) => instance.put<ApiResponse<Withdrawal>>(build(path, id, 'cancel')),
    }
}

export const api = {
    apartments,
    apartmentTypes,
    auth,
    bankAccounts,
    cards,
    communities,
    currencies,
    estates,
    facilityManagers,
    faqCategories,
    faqs,
    ghosts,
    health,
    hooks,
    invitations,
    locations,
    logs,
    members,
    notifications,
    organizations,
    paymentRequests,
    payments,
    projects,
    recurringPayments,
    residents,
    roles,
    serviceCategories,
    settings,
    statistics,
    storage,
    transactions,
    users,
    utilities,
    vendors,
    wallets,
    withdrawals,
}