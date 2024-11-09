import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testemunha } from './testemunha.schema';
import { CreateTestemunhaDto } from './create-testemunha.dto';
import { UpdateTestemunhaDto } from './update-testemunha.dto';

@Injectable()
export class TestemunhaService {
  constructor(@InjectModel('Testemunha') private readonly testemunhaModel: Model<Testemunha>) {}

  async create(createTestemunhaDto: CreateTestemunhaDto): Promise<Testemunha> {
    const novaTestemunha = new this.testemunhaModel(createTestemunhaDto);
    return novaTestemunha.save();
  }

  async findAll(): Promise<Testemunha[]> {
    return this.testemunhaModel.find().exec();
  }

  async findById(id: string): Promise<Testemunha> {
    return this.testemunhaModel.findById(id).exec();
  }

  async update(id: string, updateTestemunhaDto: UpdateTestemunhaDto): Promise<Testemunha> {
    return this.testemunhaModel.findByIdAndUpdate(id, updateTestemunhaDto, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.testemunhaModel.findByIdAndDelete(id).exec();
    return result ? true : false;
  }
}
