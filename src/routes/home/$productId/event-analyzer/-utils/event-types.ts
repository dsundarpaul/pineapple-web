import { BasicEventFromSchema } from '@/utils/formSchemas/event-analyzer.formschema';
import * as z from 'zod';

export type InferedBasicEventFromSchemaType = z.infer<typeof BasicEventFromSchema>
