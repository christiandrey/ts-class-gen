namespace Caretaker.Models.Enums
{
   public enum EmailTemplateType
   {
      Default,
      EmailVerification,
      ForgotPassword,
      ResidentInvitation,
      VendorInvitation,
      BeneficiaryWithdrawRequest,
      WithdrawRequest,
      WithdrawalSuccessful,
      WithdrawalFailed,
      ExistingResidentOnboarded,
      ResidentOnboarded,
      ResidentsOnboarded,
      MemberCreated,
      LowMessagingProviderBalance,
      LowPaymentsProviderBalance,
      PaymentRequestCreated,
      DefaultAction
   }
}