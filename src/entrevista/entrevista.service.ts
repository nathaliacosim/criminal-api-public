import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entrevista } from './entrevista.schema';
import { CreateEntrevistaDto } from './create-entrevista.dto';
import { UpdateEntrevistaDto } from './update-entrevista.dto';

@Injectable()
export class EntrevistaService {
  constructor(
    @InjectModel('Entrevista') private readonly entrevistaModel: Model<Entrevista>,
  ) {}

  async create(createEntrevistaDto: CreateEntrevistaDto): Promise<Entrevista> {
    const createdEntrevista = new this.entrevistaModel(createEntrevistaDto);
    return createdEntrevista.save();
  }

  async findOne(id: string): Promise<Entrevista> {
    return this.entrevistaModel.findById(id).exec();
  }

  async findByCaso(casoId: string): Promise<Entrevista[]> {
    return this.entrevistaModel.find({ casoCriminal: casoId }).exec();
  }

  async update(id: string, updateEntrevistaDto: UpdateEntrevistaDto): Promise<Entrevista> {
    return this.entrevistaModel.findByIdAndUpdate(id, updateEntrevistaDto, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await this.entrevistaModel.findByIdAndDelete(id).exec();
  }
}
