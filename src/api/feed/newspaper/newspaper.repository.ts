import { autoInjectable, singleton } from 'tsyringe';

import { CreateNewspaperDto } from './dto/create-newspaper.dto';
import NewspaperModel from './models/newspaper.model';
import { NewspaperI } from './models/newspaper.schema';

@singleton()
@autoInjectable()
export class NewspaperRepository {
  async create(NewspaperInput: CreateNewspaperDto): Promise<NewspaperI> {
    return NewspaperModel.create(NewspaperInput);
  }

  async delete(id: string) {
    return NewspaperModel.findByIdAndDelete(id);
  }

  async get(id: string) {
    return NewspaperModel.findById(id);
  }

  async findAll() {
    return NewspaperModel.find();
  }
}
