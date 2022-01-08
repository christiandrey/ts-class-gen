import {getRequiredValidationMessage} from './utils';
import {object, string} from 'yup';

const planSubscriptionCreationOptions = object({
    paymentPlanId: string().required(getRequiredValidationMessage),
    transactionReference: string().required(getRequiredValidationMessage),
});

export default planSubscriptionCreationOptions;