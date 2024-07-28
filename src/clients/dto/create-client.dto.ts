import { IsEmail, IsNotEmpty } from 'class-validator';
import { ClientType } from '../enum/client.enum';

export class CreateClientDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: ClientType;

  @IsEmail()
  contactMail: string;
}
