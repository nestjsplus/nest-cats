import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Put,
  Delete,
  HttpStatus,
  HttpException,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCatDto, UpdateCatDto } from './dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { createCatSchema } from './schema/create-cat.schema';
import { JoiValidationPipe } from '../common/pipes/joi-validation.pipe';
// import { ValidationPipe } from '../common/pipes/validation.pipe';
import { ParseIntPipe } from '../common/pipes/parse-int.pipe';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Get('kaboom')
  badRoute() {
    throw new Error('kaboom');
  }

  // Use one of the following implementations for
  // the create() method.
  //
  // This version uses the JoiValidationPipe
  // @Post()
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  // async create(@Body() createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  // }

  // This version uses the hand-crafted (class validator) ValidationPipe
  // @Post()
  // @UsePipes(new ValidationPipe())
  // async create(@Body() createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  // }

  // This version uses the built-in class validator based ValidationPipe
  // with the transform option.
  //
  // Be sure to switch up the import statement to import the built-in
  // ValidationPipe from `@nestjs/common` rather than from `../common/pipes/validation.pipe`
  // when using this one.
  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll();
  }

  // route to test our HttpExceptionFilter
  @Get('httpexcep')
  @UseFilters(HttpExceptionFilter)
  async getExcep() {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        error: 'This is a custom message',
      },
      403,
    );
  }

  @Get(':id')
  findOne(@Param('id', new ParseIntPipe()) id: string) {
    return `This action returns a #${id} cat`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} cat`;
  }
}
