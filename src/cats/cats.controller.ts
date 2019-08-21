import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  Query,
  HttpCode,
  Header,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto, ListAllEntities } from './dto';

// for library-specific approach
import { Response } from 'express';

@Controller('cats')
export class CatsController {
  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Post('2')
  @HttpCode(200)
  create2(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  @Post('3')
  @Header('Cache-Control', 'none')
  create3(@Body() createCatDto: CreateCatDto) {
    return 'This action adds a new cat';
  }

  // library-specific approach routes
  @Post('exp')
  createExp(@Res() res: Response) {
    res.status(HttpStatus.CREATED).send('This action adds a new express cat');
  }

  @Get('exp')
  findExp(@Res() res: Response) {
    res
      .status(HttpStatus.OK)
      .json({ status: 'OK', message: 'This action returns an express cat' });
  }
  // end of library-specific approach routes

  @Get()
  findAll(@Query() query: ListAllEntities) {
    return `This action returns all cats (limit: ${query.limit} items)`;
  }

  // wildcard routes
  @Get('ab*cd')
  wildcard() {
    return 'This route uses a wildcard';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} cat`;
  }

  @Get('/params/:p1/:p2')
  findWithparams(@Param() params) {
    return `Route called with params ${JSON.stringify(params)}`;
  }

  // route order testing
  // @Get('ab*cd')
  // wildcard() {
  //   return 'This route uses a wildcard';
  // }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
