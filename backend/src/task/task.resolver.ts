import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import {
  CreateTaskArgs,
  FindManyTaskArgs,
  FindUniqueTaskArgs,
  Task,
  UpdateTaskArgs,
} from './dto';
import { TaskService } from './task.service';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private readonly taskService: TaskService) {}

  @Query(() => Task, { name: 'task', nullable: true })
  async findUnique(@Args() args: FindUniqueTaskArgs) {
    const task = await this.taskService.findUnique(args);
    if (!task) throw new NotFoundException('task Not Found.');
    return task;
  }

  @Query(() => [Task], { name: 'tasks' })
  findMany(@Args() args: FindManyTaskArgs) {
    return this.taskService.findMany(args);
  }

  @Mutation(() => Task)
  createTask(@Args() args: CreateTaskArgs) {
    return this.taskService.create(args);
  }

  @Mutation(() => Task)
  updateTask(@Args() args: UpdateTaskArgs) {
    return this.taskService.update(args);
  }
}
