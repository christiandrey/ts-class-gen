namespace Caretaker.Models.Enums
{
   public enum PaymentMode
   {
      Wallet,
      OrganizationWallet, // TODO: Use this mode in payments that go to organization wallet.
      EstateWallet, // TODO: Use this mode in payments received by FM that go to estate wallet.
      BankAccount,
   }
}