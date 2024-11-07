// src/testemunha/testemunha.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testemunha } from './testemunha.schema';
import { CreateTestemunhaDto } from './create-testemunha.dto';

@Injectable()
export class TestemunhaService {
  constructor(
    @InjectModel('Testemunha')
    private readonly testemunhaModel: Model<Testemunha>,
  ) {}

  async createTestemunha(
    createTestemunhaDto: CreateTestemunhaDto,
  ): Promise<Testemunha> {
    const createdTestemunha = new this.testemunhaModel(createTestemunhaDto);
    return createdTestemunha.save();
  }

  async getAllTestemunhas(): Promise<Testemunha[]> {
    return this.testemunhaModel.find().exec();
  }

  async getTestemunhaById(id: string): Promise<Testemunha> {
    return this.testemunhaModel.findById(id).exec();
  }
}
