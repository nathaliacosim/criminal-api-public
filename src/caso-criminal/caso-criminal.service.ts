import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CasoCriminal } from './caso-criminal.schema';
import { CreateCasoCriminalDto } from './create-caso-criminal.dto';
import { UpdateCasoCriminalDto } from './update-caso-criminal.dto';
import { Suspeito } from 'src/suspeito/suspeito.schema';
import { Testemunha } from 'src/testemunha/testemunha.schema';
import { Detetive } from 'src/detetive/detetive.schema';
import { Evidencia } from 'src/evidencia/evidencia.schema';

@Injectable()
export class CasoCriminalService {
  constructor(
    @InjectModel('CasoCriminal') private readonly casoCriminalModel: Model<CasoCriminal>,
    @InjectModel('Suspeito') private readonly suspeitoModel: Model<Suspeito>,
    @InjectModel('Testemunha') private readonly testemunhaModel: Model<Testemunha>,
    @InjectModel('Detetive') private readonly detetiveModel: Model<Detetive>,
    @InjectModel('Evidencia') private readonly evidenciaModel: Model<Evidencia>,
  ) {}

  async createCasoCriminal(createCasoCriminalDto: CreateCasoCriminalDto): Promise<CasoCriminal> {
    const { suspeitos, testemunhas, detetives, evidencias } = createCasoCriminalDto;
    
    const invalidSuspeitos = await this.suspeitoModel.find({ '_id': { $in: suspeitos } }).exec();
    if (invalidSuspeitos.length !== suspeitos.length) {
      throw new BadRequestException('Alguns suspeitos não foram encontrados.');
    }

    const invalidTestemunhas = await this.testemunhaModel.find({ '_id': { $in: testemunhas } }).exec();
    if (invalidTestemunhas.length !== testemunhas.length) {
      throw new BadRequestException('Algumas testemunhas não foram encontradas.');
    }

    const invalidDetetives = await this.detetiveModel.find({ '_id': { $in: detetives } }).exec();
    if (invalidDetetives.length !== detetives.length) {
      throw new BadRequestException('Alguns detetives não foram encontrados.');
    }

    const invalidEvidencias = await this.evidenciaModel.find({ '_id': { $in: evidencias } }).exec();
    if (invalidEvidencias.length !== evidencias.length) {
      throw new BadRequestException('Algumas evidências não foram encontradas.');
    }

    const createdCasoCriminal = new this.casoCriminalModel(createCasoCriminalDto);
    return createdCasoCriminal.save();
  }

  async getAllCasosCriminais(): Promise<CasoCriminal[]> {
    return this.casoCriminalModel.find().populate('suspeitos testemunhas detetives evidencias').exec();
  }

  async getCasoCriminalById(id: string): Promise<CasoCriminal> {
    const casoCriminal = await this.casoCriminalModel.findById(id)
      .populate('suspeitos testemunhas detetives evidencias')
      .exec();

    if (!casoCriminal) {
      throw new NotFoundException('Caso criminal não encontrado.');
    }

    return casoCriminal;
  }

  async updateCasoCriminal(id: string, updateCasoCriminalDto: UpdateCasoCriminalDto): Promise<CasoCriminal> {
    const casoCriminal = await this.casoCriminalModel.findById(id).exec();

    if (!casoCriminal) {
      throw new NotFoundException('Caso criminal não encontrado.');
    }

    const updatedCasoCriminal = await this.casoCriminalModel.findByIdAndUpdate(id, updateCasoCriminalDto, {
      new: true,
    }).exec();

    return updatedCasoCriminal;
  }

  async deleteCasoCriminal(id: string): Promise<void> {
    const casoCriminal = await this.casoCriminalModel.findById(id).exec();

    if (!casoCriminal) {
      throw new NotFoundException('Caso criminal não encontrado.');
    }

    await this.casoCriminalModel.findByIdAndDelete(id).exec();
  }
}
