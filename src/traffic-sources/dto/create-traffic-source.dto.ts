import { IsNotEmpty } from 'class-validator';

export class CreateTrafficSourceDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  publisherId: number;
}
