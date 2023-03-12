import { ObjectType } from '@nestjs/graphql';
import { Task as GeneratedTask } from '@Prisma/index';

@ObjectType()
export class Task extends GeneratedTask {}
