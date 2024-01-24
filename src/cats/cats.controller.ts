import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseFilters,
} from '@nestjs/common';
import { CatsService } from './core/cats.service';
import { Request } from 'express';
import {
  CatsRequestParamDto,
  PatchCatsRequestParamDto,
} from './CatsRequestParam.dto';
import { GetHeaders } from '../decorators';
import {
  ApiBasicAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ExceptionsFilter } from './exceptions-filter';
import { AuthGuard } from '@nestjs/passport';
import { Public } from './auth/basic-auth.guard';

@Controller('cats')
@UseFilters(ExceptionsFilter)
@ApiTags('CATS')
@ApiBasicAuth()
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @ApiOperation({
    summary: "fetch one cat by it's id",
    description: 'find one',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.catsService.getOne(id);
  }

  @ApiOperation({
    summary: 'fetch all cats',
    description: 'find all',
  })
  @Get()
  @GetHeaders(HttpStatus.OK)
  @Public()
  async xxx() {
    return await this.catsService.getAll();
  }

  @ApiOperation({
    summary: 'create a cat',
    description: 'create',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: 201,
    description: 'the cat was successfully created. Check location header.',
  })
  @ApiResponse({
    status: 409,
    description: 'the cat already exists.',
  })
  async createCat(@Body() body: CatsRequestParamDto, @Req() request: Request) {
    await this.catsService.create({
      id: body.id,
      age: body.age,
      name: body.name,
    });
    const location = `/cats/${body.id}`;
    request.res.setHeader('Location', location);
  }

  @ApiOperation({
    summary: 'change a cat characteristics',
    description: 'patch',
  })
  @Patch(':id')
  @HttpCode(HttpStatus.CREATED)
  async patchCat(
    @Param('id') id: string,
    @Body() body: PatchCatsRequestParamDto,
    @Req() request: Request,
  ) {
    await this.catsService.changeCharacteristics(id, body.name, body.age);
    const location = `/cats/${id}`;
    request.res.setHeader('Location', location);
  }
}
