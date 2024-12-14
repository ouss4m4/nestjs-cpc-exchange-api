import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';
import { ClientType } from '../enum/client.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateClientDto {
  @ApiProperty({
    description: 'Name of the client',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Type of the client',
    enum: ClientType, // Swagger will generate a dropdown for this enum
    example: ClientType.Publisher, // Example value for Swagger
  })
  @IsNotEmpty()
  @IsEnum(ClientType, {
    message: 'type must be a valid enum value (Publisher=1, Advertiser=2)',
  })
  type: ClientType;

  @IsEmail()
  contactMail: string;
}
