import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Entrevista } from './entrevista.schema';
import { CreateEntrevistaDto } from './create-entrevista.dto';
import { UpdateEntrevistaDto } from './update-entrevista.dto';
import { CasoCriminal } from 'src/caso-criminal/caso-criminal.schema';

@Injectable()
export class EntrevistaService {
  constructor(
    @InjectModel('Entrevista') private readonly entrevistaModel: Model<Entrevista>,
    @InjectModel('CasoCriminal') private readonly casoCriminalModel: Model<CasoCriminal>
  ) {}

  async findAll(): Promise<Entrevista[]> {
    return this.entrevistaModel.find().exec();
  }

  async create(createEntrevistaDto: CreateEntrevistaDto): Promise<Entrevista> {
    const { casoCriminal, ...entrevistaData } = createEntrevistaDto;

    let auxCasoCriminal = null;
    if (casoCriminal) {
      auxCasoCriminal = await this.casoCriminalModel.findById(casoCriminal);
      if (!auxCasoCriminal) {
        throw new NotFoundException('Caso Criminal não encontrado');
      }
    }

    const entrevista = new this.entrevistaModel({
      ...entrevistaData,
      casoCriminal: auxCasoCriminal ? auxCasoCriminal._id : null,
    });

    const createdEntrevista = await entrevista.save();

    if (auxCasoCriminal) {
      auxCasoCriminal.entrevistas.push(createdEntrevista._id);
      await auxCasoCriminal.save();
    }

    return createdEntrevista;
  }

  async findOne(id: string): Promise<Entrevista> {
    const entrevista = await this.entrevistaModel.findById(id).exec();
    if (!entrevista) throw new NotFoundException('Entrevista não encontrada');
    return entrevista;
  }

  async findByCaso(casoId: string): Promise<Entrevista[]> {
    return this.entrevistaModel.find({ casoCriminal: casoId }).exec();
  }

  async update(id: string, updateEntrevistaDto: UpdateEntrevistaDto): Promise<Entrevista> {
    const { casoCriminal, ...updateData } = updateEntrevistaDto;

    let auxCasoCriminal = null;
    if (casoCriminal) {
      auxCasoCriminal = await this.casoCriminalModel.findById(casoCriminal);
      if (!auxCasoCriminal) {
        throw new NotFoundException('Caso Criminal não encontrado');
      }
    }

    const updatedEntrevista = await this.entrevistaModel.findByIdAndUpdate(
      id,
      {
        ...updateData,
        casoCriminal: auxCasoCriminal ? auxCasoCriminal._id : null,
      },
      { new: true }
    ).exec();

    if (!updatedEntrevista) throw new NotFoundException('Entrevista não encontrada');
    return updatedEntrevista;
  }

  async delete(id: string): Promise<boolean> {
    const entrevista = await this.entrevistaModel.findById(id).exec();
    if (!entrevista) {
      throw new NotFoundException('Entrevista não encontrada');
    }
  
    if (entrevista.casoCriminal) {
      const casoCriminal = await this.casoCriminalModel.findById(entrevista.casoCriminal).exec();
      if (casoCriminal) {
        casoCriminal.entrevistas = casoCriminal.entrevistas.filter(
          (entrevistaId) => entrevistaId.toString() !== id
        );
        await casoCriminal.save();
      }
    }
  
    await this.entrevistaModel.findByIdAndDelete(id).exec();
  
    return true;
  }
}
