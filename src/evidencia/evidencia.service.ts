import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEvidenciaDto } from './create-evidencia.dto';
import { UpdateEvidenciaDto } from './update-evidencia.dto';
import { Evidencia } from './evidencia.schema';

@Injectable()
export class EvidenciaService {
  constructor(
    @InjectModel('Evidencia') private readonly evidenciaModel: Model<Evidencia>
  ) {}

  async create(createEvidenciaDto: CreateEvidenciaDto): Promise<Evidencia> {
    const evidencia = new this.evidenciaModel(createEvidenciaDto);
    return evidencia.save();
  }

  async update(id: string, updateEvidenciaDto: UpdateEvidenciaDto): Promise<Evidencia> {
    return this.evidenciaModel.findByIdAndUpdate(id, updateEvidenciaDto, { new: true });
  }

  async findAll(): Promise<Evidencia[]> {
    return this.evidenciaModel.find().populate('casoCriminal detetives');
  }

  async findById(id: string): Promise<Evidencia> {
    return this.evidenciaModel.findById(id).populate('casoCriminal detetives');
  }

  async delete(id: string): Promise<void> {
    await this.evidenciaModel.findByIdAndDelete(id);
  }
}
