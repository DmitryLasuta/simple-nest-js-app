import { PickType } from '@nestjs/mapped-types';
import { Task } from '../entities';
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateTaskDto extends PickType(Task, ['title', 'description'] as const) {
  private static TITLE_LENGTH = {
    MIN: 5,
    MAX: 255,
  };

  private static DESCRIPTION_LENGTH = {
    MIN: 5,
    MAX: 255,
  };

  @IsNotEmpty({ message: 'Название обязательное поле для заполнения' })
  @IsString({
    message: 'Название задачи должно быть строкой',
  })
  @Length(CreateTaskDto.TITLE_LENGTH.MIN, CreateTaskDto.TITLE_LENGTH.MAX, {
    message: `Название задачи должно содержать от ${CreateTaskDto.TITLE_LENGTH.MIN} до ${CreateTaskDto.TITLE_LENGTH.MAX}`,
  })
  public title: string;
  @IsNotEmpty({ message: 'Описание не может быть пустым' })
  @IsString({
    message: 'Описание задачи должно быть строкой',
  })
  @Length(CreateTaskDto.DESCRIPTION_LENGTH.MIN, CreateTaskDto.DESCRIPTION_LENGTH.MAX, {
    message: `Описание задачи должно содержать от ${CreateTaskDto.DESCRIPTION_LENGTH.MIN} до ${CreateTaskDto.DESCRIPTION_LENGTH.MAX}`,
  })
  @IsOptional()
  public description?: string;
}
