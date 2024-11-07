// src/caso-criminal/caso-criminal.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CasoCriminal } from './caso-criminal.schema';
import { CreateCasoCriminalDto } from './create-caso-criminal.dto';

@Injectable()
export class CasoCriminalService {
  constructor(
    @InjectModel('CasoCriminal')
    private readonly casoCriminalModel: Model<CasoCriminal>,
  ) {}

  async getAllCasosCriminais(): Promise<CasoCriminal[]> {
    return this.casoCriminalModel
      .find()
      .populate(['suspeitos', 'testemunhas', 'detetives', 'tipoCrime'])
      .exec();
  }

  async createCasoCriminal(
    createCasoCriminalDto: CreateCasoCriminalDto,
  ): Promise<CasoCriminal> {
    const casoCriminal = new this.casoCriminalModel(createCasoCriminalDto);
    return casoCriminal.save();
  }

  async deleteCasoCriminal(id: string): Promise<void> {
    const result = await this.casoCriminalModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Caso criminal com id ${id} não encontrado`);
    }
  }
}
