import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Detetive } from './detetive.schema';
import { CreateDetetiveDto } from './create-detetive.dto';
import { UpdateDetetiveDto } from './update-detetive.dto';

@Injectable()
export class DetetiveService {
  constructor(
    @InjectModel('Detetive') private readonly detetiveModel: Model<Detetive>,
  ) {}

  async create(createDetetiveDto: CreateDetetiveDto): Promise<Detetive> {
    const detetive = new this.detetiveModel(createDetetiveDto);
    return detetive.save();
  }

  async findAll(): Promise<Detetive[]> {
    return this.detetiveModel.find().exec();
  }

  async findById(id: string): Promise<Detetive> {
    const detetive = await this.detetiveModel.findById(id).exec();
    if (!detetive) {
      throw new NotFoundException(`Detetive com ID ${id} não encontrado`);
    }
    return detetive;
  }

  async update(
    id: string,
    updateDetetiveDto: UpdateDetetiveDto,
  ): Promise<Detetive> {
    const detetive = await this.detetiveModel
      .findByIdAndUpdate(id, updateDetetiveDto, { new: true })
      .exec();
    if (!detetive) {
      throw new NotFoundException(`Detetive com ID ${id} não encontrado`);
    }
    return detetive;
  }

  async delete(id: string): Promise<void> {
    const detetive = await this.detetiveModel.findByIdAndDelete(id).exec();
    if (!detetive) {
      throw new NotFoundException(`Detetive com ID ${id} não encontrado`);
    }
  }
}
