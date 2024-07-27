import { PartialType } from '@nestjs/mapped-types';
import { CreateLanderDto } from './create-lander.dto';

export class UpdateLanderDto extends PartialType(CreateLanderDto) {}
