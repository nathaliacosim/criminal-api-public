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
import { Entrevista } from 'src/entrevista/entrevista.schema';

@Injectable()
export class CasoCriminalService {
  constructor(
    @InjectModel('CasoCriminal') private readonly casoCriminalModel: Model<CasoCriminal>,
    @InjectModel('Suspeito') private readonly suspeitoModel: Model<Suspeito>,
    @InjectModel('Testemunha') private readonly testemunhaModel: Model<Testemunha>,
    @InjectModel('Detetive') private readonly detetiveModel: Model<Detetive>,
    @InjectModel('Evidencia') private readonly evidenciaModel: Model<Evidencia>,
    @InjectModel('Entrevista') private readonly entrevistaModel: Model<Entrevista>,
  ) {}

  private async validateRelations(ids: string[], model: Model<any>, entityName: string) {
    if (ids && ids.length > 0) {
      const validEntities = await model.find({ '_id': { $in: ids } }).exec();
      if (validEntities.length !== ids.length) {
        throw new BadRequestException(`Alguns ${entityName} não foram encontrados.`);
      }
    }
  }

  async createCasoCriminal(createCasoCriminalDto: CreateCasoCriminalDto): Promise<CasoCriminal> {
    const { suspeitos, testemunhas, detetives, evidencias, entrevistas } = createCasoCriminalDto;

    await this.validateRelations(suspeitos, this.suspeitoModel, 'suspeitos');
    await this.validateRelations(testemunhas, this.testemunhaModel, 'testemunhas');
    await this.validateRelations(detetives, this.detetiveModel, 'detetives');
    await this.validateRelations(evidencias, this.evidenciaModel, 'evidências');
    await this.validateRelations(entrevistas, this.entrevistaModel, 'entrevistas');

    const createdCasoCriminal = new this.casoCriminalModel(createCasoCriminalDto);
    return createdCasoCriminal.save();
  }

  async getAllCasosCriminais(): Promise<CasoCriminal[]> {
    return this.casoCriminalModel
      .find()
      .populate('suspeitos testemunhas detetives evidencias entrevistas')
      .exec();
  }

  async getCasoCriminalById(id: string): Promise<CasoCriminal> {
    const casoCriminal = await this.casoCriminalModel
      .findById(id)
      .populate('suspeitos testemunhas detetives evidencias entrevistas')
      .exec();

    if (!casoCriminal) {
      throw new NotFoundException('Caso criminal não encontrado.');
    }

    return casoCriminal;
  }

  async updateCasoCriminal(id: string, updateCasoCriminalDto: UpdateCasoCriminalDto): Promise<CasoCriminal> {
    const { suspeitos, testemunhas, detetives, evidencias, entrevistas } = updateCasoCriminalDto;

    // Validações para relacionamentos
    await this.validateRelations(suspeitos, this.suspeitoModel, 'suspeitos');
    await this.validateRelations(testemunhas, this.testemunhaModel, 'testemunhas');
    await this.validateRelations(detetives, this.detetiveModel, 'detetives');
    await this.validateRelations(evidencias, this.evidenciaModel, 'evidências');
    await this.validateRelations(entrevistas, this.entrevistaModel, 'entrevistas');

    const updatedCasoCriminal = await this.casoCriminalModel
      .findByIdAndUpdate(id, updateCasoCriminalDto, { new: true })
      .exec();

    if (!updatedCasoCriminal) {
      throw new NotFoundException('Caso criminal não encontrado.');
    }

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
