import { IsNumber, IsString, Max } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class CatsRequestParamDto {
  @IsString()
  readonly id: string;

  @IsString()
  readonly name: string;

  @IsNumber()
  @Max(10)
  readonly age: number;
}

export class PatchCatsRequestParamDto extends PartialType(
  CatsRequestParamDto,
) {}
