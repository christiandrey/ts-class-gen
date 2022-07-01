import {object, string} from 'yup';

const userLite = object({
    firstName: string(),
    lastName: string(),
    fullName: string(),
});

export default userLite;