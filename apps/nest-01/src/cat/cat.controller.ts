import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
  UseFilters,
  ParseUUIDPipe,
  HttpStatus,
  UsePipes,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CatService } from './cat.service';
import {
  CreateCatDto,
  QueryCatDto,
  UpdateCatDto,
  createCatSchema,
  updateCatSchema,
} from './cat.dto';
import { HttpExceptionFilter } from '@steeeee/my-lib/filter';
import { ForbiddenException } from '@steeeee/my-lib/exceptions';
import { ZodValidationPipe } from '@steeeee/my-lib/pipes';
import { RolesGuard } from '@steeeee/my-lib/guards';
import { Roles } from '@steeeee/my-lib/decorators';
import { LoggingInterceptor } from '@steeeee/my-lib/interceptors';

@Controller('cat')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatController {
  constructor(private readonly catService: CatService) {}

  @Post()
  @Roles(['admin'])
  @UsePipes(new ZodValidationPipe(createCatSchema))
  create(@Body() createCatDto: CreateCatDto) {
    return this.catService.create(createCatDto);
  }

  @Get()
  findAll(@Query() queryCatDto: QueryCatDto) {
    return this.catService.findAll(queryCatDto);
  }

  @Get('feed')
  @HttpCode(200)
  feed(@Query('breed') breed?: string): string {
    if (!breed) throw new ForbiddenException();
    return `You fed all ${breed} cats`;
  }

  @Get(':id')
  findOne(
    @Param(
      'id',
      new ParseUUIDPipe({
        version: '4',
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: string,
  ) {
    return this.catService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ZodValidationPipe(updateCatSchema))
  update(@Param('id') id: string, @Body() updateCatDto: UpdateCatDto) {
    return this.catService.update(id, updateCatDto);
  }

  @Delete(':id')
  @Roles(['admin'])
  remove(@Param('id') id: string) {
    return this.catService.remove(id);
  }

  @Get(':category/:id')
  @HttpCode(200)
  findByCategory(
    @Param('category') category: string,
    @Param('id') id: string,
  ): string {
    return `This action returns a ${category} cat with ID ${id}`;
  }
}
