import {EstateEntities, estateSchema} from './estate';
import {UserEntities, userSchema} from './user';

import {AdminWithdrawal} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const adminWithdrawalSchema = new schema.Entity('adminWithdrawals', {
    estate: estateSchema,
    user: userSchema,
});

export type AdminWithdrawalEntities = SchemaEntities<{
    adminWithdrawal: AdminWithdrawal;
}> & EstateEntities & UserEntities;