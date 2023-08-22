import { Route, Controller, Get, Path, Post, SuccessResponse, Body } from 'tsoa';
import { inject, injectable } from 'tsyringe';

import { CreateNewspaperDto } from './dto/create-newspaper.dto';
import { NewspaperI } from './models/newspaper.schema';
import { NewspaperService } from './newspaper.service';

@injectable()
@Route('v1/newspaper')
export class NewspaperController extends Controller {
  constructor(@inject(NewspaperService) private newspaperService: NewspaperService) {
    super();
  }

  @Get('/get/{id}')
  @SuccessResponse('200', 'OK')
  async getNewspaper(@Path() id: string): Promise<NewspaperI> {
    this.setStatus(200);
    return this.newspaperService.findOne(id);
  }

  @Get('/all')
  @SuccessResponse('200', 'OK')
  async getAllNewspapers(): Promise<NewspaperI[]> {
    this.setStatus(200);
    return this.newspaperService.findAll();
  }

  @Post()
  @SuccessResponse('201', 'Created')
  async createNewspaper(@Body() newspaper: CreateNewspaperDto): Promise<NewspaperI> {
    this.setStatus(201);
    return this.newspaperService.create(newspaper);
  }

  @Post('/delete/{id}')
  @SuccessResponse('200', 'OK')
  async deleteNewspaper(@Path() id: string): Promise<NewspaperI> {
    this.setStatus(200);
    return this.newspaperService.remove(id);
  }
}
