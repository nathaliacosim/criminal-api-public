import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Suspeito } from './suspeito.schema';
import { CreateSuspeitoDto } from './create-suspeito.dto';

@Injectable()
export class SuspeitoService {
  constructor(
    @InjectModel('Suspeito') private readonly suspeitoModel: Model<Suspeito>,
  ) {}

  async createSuspeito(
    createSuspeitoDto: CreateSuspeitoDto,
  ): Promise<Suspeito> {
    const createdSuspeito = new this.suspeitoModel(createSuspeitoDto);
    return createdSuspeito.save();
  }

  async getAllSuspeitos(): Promise<Suspeito[]> {
    return this.suspeitoModel.find().exec();
  }

  async getSuspeitoById(id: string): Promise<Suspeito> {
    return this.suspeitoModel.findById(id).exec();
  }
}
