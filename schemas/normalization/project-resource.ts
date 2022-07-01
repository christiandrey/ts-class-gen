import {ProjectResource} from '../../entities';
import {SchemaEntities} from '../../typings/state';
import {schema} from 'normalizr';

export const projectResourceSchema = new schema.Entity('projectResources');

export type ProjectResourceEntities = SchemaEntities<{
    projectResource: ProjectResource;
}>