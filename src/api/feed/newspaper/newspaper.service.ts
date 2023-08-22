import { singleton } from 'tsyringe';

import { CreateNewspaperDto } from './dto/create-newspaper.dto';
import newspaperModel from './models/newspaper.model';
import { NewspaperI } from './models/newspaper.schema';
import { ApiError } from '../../../middlewares/apiErrors';
import { HTTP_ERRORS } from '../../../utils/httpErrors';

@singleton()
export class NewspaperService {
  async create(newspaper: CreateNewspaperDto): Promise<NewspaperI> {
    try {
      return await newspaperModel.create(newspaper);
    } catch (error) {
      throw new ApiError(HTTP_ERRORS.INTERNAL_SERVER_ERROR, 'Error creating newspaper!');
    }
  }

  async remove(id: string): Promise<NewspaperI> {
    try {
      const newspaper = await newspaperModel.findOneAndDelete({ _id: id });
      if (newspaper) return newspaper;
      throw new ApiError(HTTP_ERRORS.NOT_FOUND, 'Newspaper not found!');
    } catch (error) {
      throw new ApiError(HTTP_ERRORS.INTERNAL_SERVER_ERROR, 'Error deleting newspaper!');
    }
  }

  async findOne(id: string): Promise<NewspaperI> {
    try {
      const newspaper = await newspaperModel.findById(id);
      if (newspaper) return newspaper;
      throw new ApiError(HTTP_ERRORS.NOT_FOUND, 'Newspaper not found!');
    } catch (error) {
      throw new ApiError(HTTP_ERRORS.INTERNAL_SERVER_ERROR, 'Error finding newspaper!');
    }
  }

  async findAll(): Promise<NewspaperI[]> {
    try {
      return newspaperModel.find();
    } catch (error) {
      throw new ApiError(HTTP_ERRORS.INTERNAL_SERVER_ERROR, 'Error finding newspapers!');
    }
  }
}
