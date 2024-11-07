// src/tipo-crime/tipo-crime.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TipoCrime } from './tipo-crime.schema';
import { CreateTipoCrimeDto } from './create-tipo-crime.dto';

@Injectable()
export class TipoCrimeService {
  constructor(
    @InjectModel('TipoCrime') private readonly tipoCrimeModel: Model<TipoCrime>,
  ) {}

  async getAllTiposCrime(): Promise<TipoCrime[]> {
    return this.tipoCrimeModel.find().exec();
  }

  async createTipoCrime(
    createTipoCrimeDto: CreateTipoCrimeDto,
  ): Promise<TipoCrime> {
    const tipoCrime = new this.tipoCrimeModel(createTipoCrimeDto);
    return tipoCrime.save();
  }

  async findById(id: string): Promise<TipoCrime | null> {
    return this.tipoCrimeModel.findById(id).exec();
  }

  async deleteTipoCrime(id: string): Promise<void> {
    const result = await this.tipoCrimeModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Tipo de crime com id ${id} não encontrado`);
    }
  }
}
