import { PartialType } from '@nestjs/mapped-types';
import { CreateCasoCriminalDto } from './create-caso-criminal.dto';

export class UpdateCasoCriminalDto extends PartialType(CreateCasoCriminalDto) {}