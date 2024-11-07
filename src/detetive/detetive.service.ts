import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Detetive } from './detetive.schema';
import { CreateDetetiveDto } from './create-detetive.dto';

@Injectable()
export class DetetiveService {
  constructor(
    @InjectModel('Detetive') private readonly detetiveModel: Model<Detetive>,
  ) {}

  async createDetetive(
    createDetetiveDto: CreateDetetiveDto,
  ): Promise<Detetive> {
    const createdDetetive = new this.detetiveModel(createDetetiveDto);
    return createdDetetive.save();
  }

  async getAllDetetives(): Promise<Detetive[]> {
    return this.detetiveModel.find().exec();
  }

  async getDetetiveById(id: string): Promise<Detetive> {
    return this.detetiveModel.findById(id).exec();
  }
}
