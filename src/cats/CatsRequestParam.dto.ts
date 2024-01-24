import { IsNumber, IsString, Max } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';

export class CatsRequestParamDto {
  @ApiProperty({
    description: 'unique identifier of the cat',
    example: '535af272-3a84-4967-a928-3377e6c93556',
  })
  @IsString()
  readonly id: string;

  @ApiProperty({
    description: "the cat's name",
    example: 'Miaw',
  })
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: "the cat's age'",
    example: '4',
  })
  @IsNumber()
  @Max(10)
  readonly age: number;
}

export class PatchCatsRequestParamDto extends PartialType(
  CatsRequestParamDto,
) {}
