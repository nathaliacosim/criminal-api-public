import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Evidencia } from './evidencia.schema';
import { CreateEvidenciaDto } from './create-evidencia.dto';
import { UpdateEvidenciaDto } from './update-evidencia.dto';
import { CasoCriminal } from 'src/caso-criminal/caso-criminal.schema';

@Injectable()
export class EvidenciaService {
  constructor(
    @InjectModel('Evidencia') private readonly evidenciaModel: Model<Evidencia>,
    @InjectModel('CasoCriminal') private readonly casoCriminalModel: Model<CasoCriminal>
  ) {}

  async create(createEvidenciaDto: CreateEvidenciaDto): Promise<Evidencia> {
    const { casoCriminal, ...evidenciaData } = createEvidenciaDto;

    let auxCasoCriminal = null;

    if (casoCriminal) {
      auxCasoCriminal = await this.casoCriminalModel.findById(casoCriminal);
      if (!auxCasoCriminal) {
        throw new NotFoundException('Caso Criminal não encontrado');
      }
    }

    const evidencia = new this.evidenciaModel({
      ...evidenciaData,
      casoCriminal: auxCasoCriminal ? auxCasoCriminal._id : null,
    });

    const createdEvidencia = await evidencia.save();

    if (auxCasoCriminal) {
      auxCasoCriminal.evidencias.push(createdEvidencia._id);
      await auxCasoCriminal.save();
    }

    return createdEvidencia;
  }

  async findAll(): Promise<Evidencia[]> {
    return this.evidenciaModel.find().exec();
  }

  async findById(id: string): Promise<Evidencia> {
    const evidencia = await this.evidenciaModel.findById(id).exec();
    if (!evidencia) throw new NotFoundException('Evidência não encontrada');
    return evidencia;
  }

  async update(id: string, updateEvidenciaDto: UpdateEvidenciaDto): Promise<Evidencia> {
    const { casoCriminal, ...updateData } = updateEvidenciaDto;

    let auxCasoCriminal = null;

    if (casoCriminal) {
      auxCasoCriminal = await this.casoCriminalModel.findById(casoCriminal);
      if (!auxCasoCriminal) {
        throw new NotFoundException('Caso Criminal não encontrado');
      }
    }

    const updatedEvidencia = await this.evidenciaModel.findByIdAndUpdate(
      id,
      {
        ...updateData,
        casoCriminal: auxCasoCriminal ? auxCasoCriminal._id : null,
      },
      { new: true }
    ).exec();

    if (!updatedEvidencia) throw new NotFoundException('Evidência não encontrada');

    if (auxCasoCriminal) {
      auxCasoCriminal.evidencias.push(updatedEvidencia._id);
      await auxCasoCriminal.save();
    }

    return updatedEvidencia;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.evidenciaModel.findByIdAndDelete(id).exec();
    if (!result) throw new NotFoundException('Evidência não encontrada');

    if (result.casoCriminal) {
      const casoCriminal = await this.casoCriminalModel.findById(result.casoCriminal);
      if (casoCriminal) {
        casoCriminal.evidencias = casoCriminal.evidencias.filter(
          (evidenciaId) => evidenciaId.toString() !== id
        );
        await casoCriminal.save();
      }
    }

    return true;
  }
}
