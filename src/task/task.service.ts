import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { MOCK_TASK_LIST } from './mocks/';
import { Task } from './entities';

@Injectable()
export class TaskService {
  private taskMockData = MOCK_TASK_LIST;

  private generateNewId(): number {
    return this.taskMockData.reduce((maxId, task) => Math.max(maxId, task.id), 0) + 1;
  }

  public create(createTaskDto: CreateTaskDto) {
    const newTask: Task = Object.assign(
      {
        id: this.generateNewId(),
      },
      createTaskDto,
    );

    this.taskMockData = [...this.taskMockData, newTask];
    return newTask;
  }

  public findAll() {
    return this.taskMockData;
  }

  public findOne(id: number) {
    const task = this.taskMockData.find(task => task.id === id);
    if (!task) {
      throw new BadRequestException({
        message: 'Задача не найдена',
      });
    }
    return task;
  }

  public patchUpdate(id: number, updateTaskDto: Partial<UpdateTaskDto>) {
    const task = this.findOne(id);

    Object.assign(task, updateTaskDto);

    return task;
  }

  public putUpdate(id: number, updateTaskDto: UpdateTaskDto) {
    const task = this.findOne(id);

    Object.assign(task, updateTaskDto);

    return task;
  }

  public remove(id: number) {
    const taskToRemove = this.findOne(id);

    this.taskMockData = this.taskMockData.filter(task => task.id !== taskToRemove.id);

    return taskToRemove;
  }
}
