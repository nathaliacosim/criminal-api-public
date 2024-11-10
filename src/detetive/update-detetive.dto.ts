import { PartialType } from '@nestjs/mapped-types';
import { CreateDetetiveDto } from './create-detetive.dto';

export class UpdateDetetiveDto extends PartialType(CreateDetetiveDto) {}