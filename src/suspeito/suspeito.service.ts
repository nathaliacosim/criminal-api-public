import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Suspeito } from './suspeito.schema';
import { CreateSuspeitoDto } from './create-suspeito.dto';
import { UpdateSuspeitoDto } from './update-suspeito.dto';

@Injectable()
export class SuspeitoService {
  constructor(@InjectModel('Suspeito') private readonly suspeitoModel: Model<Suspeito>) {}

  async create(createSuspeitoDto: CreateSuspeitoDto): Promise<Suspeito> {
    const novoSuspeito = new this.suspeitoModel(createSuspeitoDto);
    return novoSuspeito.save();
  }

  async findAll(): Promise<Suspeito[]> {
    return this.suspeitoModel.find().exec();
  }

  async findById(id: string): Promise<Suspeito> {
    return this.suspeitoModel.findById(id).exec();
  }

  async update(id: string, updateSuspeitoDto: UpdateSuspeitoDto): Promise<Suspeito> {
    return this.suspeitoModel.findByIdAndUpdate(id, updateSuspeitoDto, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.suspeitoModel.findByIdAndDelete(id).exec();
    return result ? true : false;
  }
}
