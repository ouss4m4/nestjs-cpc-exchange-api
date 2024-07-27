import { IsNotEmpty } from 'class-validator';

export class CreateLanderDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  clientId: number;
}
