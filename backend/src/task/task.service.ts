import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import {
  CreateTaskArgs,
  FindManyTaskArgs,
  FindUniqueTaskArgs,
  UpdateTaskArgs,
} from './dto';

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}

  findUnique(args: FindUniqueTaskArgs) {
    return this.prisma.task.findUnique(args);
  }

  findMany(args: FindManyTaskArgs) {
    return this.prisma.task.findMany(args);
  }

  create(args: CreateTaskArgs) {
    return this.prisma.task.create({
      ...args,
      data: {
        ...args.data,
      },
    });
  }

  update(args: UpdateTaskArgs) {
    return this.prisma.task.update({
      ...args,
      data: {
        ...args.data,
      },
    });
  }
}
