import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Suspeito } from './suspeito.schema';
import { CreateSuspeitoDto } from './create-suspeito.dto';
import { UpdateSuspeitoDto } from './update-suspeito.dto';
import { CasoCriminal } from 'src/caso-criminal/caso-criminal.schema';

@Injectable()
export class SuspeitoService {
  constructor(
    @InjectModel('Suspeito') private readonly suspeitoModel: Model<Suspeito>,
    @InjectModel('CasoCriminal') private readonly casoCriminalModel: Model<CasoCriminal>
  ) {}

  async create(createSuspeitoDto: CreateSuspeitoDto): Promise<Suspeito> {
    const { casoCriminal, ...suspeitoData } = createSuspeitoDto;

    let auxCasoCriminal = null;

    if (casoCriminal) {
      auxCasoCriminal = await this.casoCriminalModel.findById(casoCriminal);
      if (!auxCasoCriminal) {
        throw new NotFoundException('Caso Criminal não encontrado');
      }
    }

    const suspeito = new this.suspeitoModel({
      ...suspeitoData,
      casoCriminal: auxCasoCriminal ? auxCasoCriminal._id : null,
    });

    const createdSuspeito = await suspeito.save();

    if (auxCasoCriminal) {
      auxCasoCriminal.suspeitos.push(createdSuspeito._id);
      await auxCasoCriminal.save();
    }

    return createdSuspeito;
  }

  async findAll(): Promise<Suspeito[]> {
    return this.suspeitoModel.find().exec();
  }

  async findById(id: string): Promise<Suspeito> {
    const suspeito = await this.suspeitoModel.findById(id).exec();
    if (!suspeito) throw new NotFoundException('Suspeito não encontrado');
    return suspeito;
  }

  async update(id: string, updateSuspeitoDto: UpdateSuspeitoDto): Promise<Suspeito> {
    const { casoCriminal, ...updateData } = updateSuspeitoDto;

    let auxCasoCriminal = null;

    if (casoCriminal) {
      auxCasoCriminal = await this.casoCriminalModel.findById(casoCriminal);
      if (!auxCasoCriminal) {
        throw new NotFoundException('Caso Criminal não encontrado');
      }
    }

    const updatedSuspeito = await this.suspeitoModel.findByIdAndUpdate(
      id,
      {
        ...updateData,
        casoCriminal: auxCasoCriminal ? auxCasoCriminal._id : null,
      },
      { new: true }
    ).exec();

    if (!updatedSuspeito) throw new NotFoundException('Suspeito não encontrado');
    return updatedSuspeito;
  }

  async delete(id: string): Promise<boolean> {
    const suspeito = await this.suspeitoModel.findById(id).exec();
    if (!suspeito) throw new NotFoundException('Suspeito não encontrado');
  
    if (suspeito.casoCriminal) {
      const casoCriminal = await this.casoCriminalModel.findById(suspeito.casoCriminal).exec();
      if (casoCriminal) {
        casoCriminal.suspeitos = casoCriminal.suspeitos.filter(
          (suspeitoId) => suspeitoId.toString() !== id
        );
        await casoCriminal.save();
      }
    }
  
    await this.suspeitoModel.findByIdAndDelete(id).exec();
    return true;
  }
  
}
