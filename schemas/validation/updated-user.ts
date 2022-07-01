import {object, string} from 'yup';

const updatedUser = object({
    lastName: string(),
    firstName: string(),
});

export default updatedUser;