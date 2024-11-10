import { PartialType } from '@nestjs/mapped-types';
import { CreateTestemunhaDto } from './create-testemunha.dto';

export class UpdateTestemunhaDto extends PartialType(CreateTestemunhaDto) {}