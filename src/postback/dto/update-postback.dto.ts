import { PartialType } from '@nestjs/mapped-types';
import { CreatePostbackDto } from './create-postback.dto';

export class UpdatePostbackDto extends PartialType(CreatePostbackDto) {}
