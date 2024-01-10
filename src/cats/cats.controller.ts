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
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Request } from 'express';
import {
  CatsRequestParamDto,
  PatchCatsRequestParamDto,
} from './CatsRequestParam.dto';
import { GetHeaders } from '../decorators';


@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.catsService.getOne(id);
  }

  @Get()
  @GetHeaders(HttpStatus.OK)
  async findAll() {
    return await this.catsService.getAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createCat(@Body() body: CatsRequestParamDto, @Req() request: Request) {
    await this.catsService.create({
      id: body.id,
      age: body.age,
      name: body.name,
    });
    const location = `/cats/${body.id}`;
    request.res.setHeader('Location', location);
  }

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
