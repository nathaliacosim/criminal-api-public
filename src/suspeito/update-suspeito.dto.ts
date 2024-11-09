import { PartialType } from '@nestjs/mapped-types';
import { CreateSuspeitoDto } from './create-suspeito.dto';

export class UpdateSuspeitoDto extends PartialType(CreateSuspeitoDto) {}
