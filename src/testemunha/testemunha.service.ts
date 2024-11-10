import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testemunha } from './testemunha.schema';
import { CreateTestemunhaDto } from './create-testemunha.dto';
import { UpdateTestemunhaDto } from './update-testemunha.dto';
import { CasoCriminal } from 'src/caso-criminal/caso-criminal.schema';

@Injectable()
export class TestemunhaService {
  constructor(
    @InjectModel('Testemunha') private readonly testemunhaModel: Model<Testemunha>,
    @InjectModel('CasoCriminal') private readonly casoCriminalModel: Model<CasoCriminal>
  ) {}

  // Método para criar uma nova testemunha e associá-la ao caso criminal
  async create(createTestemunhaDto: CreateTestemunhaDto): Promise<Testemunha> {
    const { casoCriminal, ...testemunhaData } = createTestemunhaDto;

    let auxCasoCriminal = null;

    // Verificando se o casoCriminal existe
    if (casoCriminal) {
      auxCasoCriminal = await this.casoCriminalModel.findById(casoCriminal);
      if (!auxCasoCriminal) {
        throw new NotFoundException('Caso Criminal não encontrado');
      }
    }

    // Criando a nova testemunha
    const testemunha = new this.testemunhaModel({
      ...testemunhaData,
      casoCriminal: auxCasoCriminal ? auxCasoCriminal._id : null,
    });

    // Salvando a testemunha criada
    const createdTestemunha = await testemunha.save();

    // Atualizando o caso criminal para incluir a nova testemunha
    if (auxCasoCriminal) {
      auxCasoCriminal.testemunhas.push(createdTestemunha._id);  // Adiciona a testemunha ao caso
      await auxCasoCriminal.save();  // Salva a atualização do caso criminal
    }

    return createdTestemunha;
  }

  // Método para buscar todas as testemunhas
  async findAll(): Promise<Testemunha[]> {
    return this.testemunhaModel.find().exec();
  }

  // Método para buscar uma testemunha pelo ID
  async findById(id: string): Promise<Testemunha> {
    const testemunha = await this.testemunhaModel.findById(id).exec();
    if (!testemunha) throw new NotFoundException('Testemunha não encontrada');
    return testemunha;
  }

  // Método para atualizar uma testemunha existente
  async update(id: string, updateTestemunhaDto: UpdateTestemunhaDto): Promise<Testemunha> {
    const { casoCriminal, ...updateData } = updateTestemunhaDto;

    let auxCasoCriminal = null;
    
    // Verificando se o casoCriminal existe
    if (casoCriminal) {
      auxCasoCriminal = await this.casoCriminalModel.findById(casoCriminal);
      if (!auxCasoCriminal) {
        throw new NotFoundException('Caso Criminal não encontrado');
      }
    }

    // Atualizando a testemunha
    const updatedTestemunha = await this.testemunhaModel.findByIdAndUpdate(
      id,
      {
        ...updateData,
        casoCriminal: auxCasoCriminal ? auxCasoCriminal._id : null,
      },
      { new: true }
    ).exec();

    if (!updatedTestemunha) throw new NotFoundException('Testemunha não encontrada');
    return updatedTestemunha;
  }

  async delete(id: string): Promise<boolean> {
    const testemunha = await this.testemunhaModel.findById(id).exec();
    if (!testemunha) throw new NotFoundException('Testemunha não encontrada');
  
    if (testemunha.casoCriminal) {
      const casoCriminal = await this.casoCriminalModel.findById(testemunha.casoCriminal).exec();
      if (casoCriminal) {
        casoCriminal.testemunhas = casoCriminal.testemunhas.filter(
          (testemunhaId) => testemunhaId.toString() !== id
        );
        await casoCriminal.save();
      }
    }
  
    await this.testemunhaModel.findByIdAndDelete(id).exec();
    return true;
  }  
}
