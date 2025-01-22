import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { FindAllCampaignsDto } from './types';
import { ICampaignListReponse } from 'src/shared/types';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileUploadConfig } from 'src/shared/fileupload.config';
import { CampaignsUploadService } from './campaignsUpload.service';
import { CurrentUser } from 'src/auth/constants';
import { JwtPayload } from 'src/auth/types';
@Controller('campaigns')
export class CampaignsController {
  constructor(
    private readonly campaignsService: CampaignsService,
    private readonly campaignsUpload: CampaignsUploadService,
  ) {}

  @Post()
  create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignsService.create(createCampaignDto);
  }

  @Get()
  async findAll(
    @CurrentUser() user: JwtPayload,
    @Query() query: FindAllCampaignsDto,
  ): Promise<ICampaignListReponse> {
    return await this.campaignsService.findAll(query, user);
  }

  @Get('/exports')
  async export(@Query() query: FindAllCampaignsDto, @Res() res: Response) {
    const filePath = await this.campaignsService.export(query);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="campaigns.csv"`,
    );
    res.setHeader('Content-Type', 'text/csv');
    // Send the file
    res.sendFile(filePath);
  }

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', fileUploadConfig))
  async uploadCampaigns(@UploadedFile() file: Express.Multer.File) {
    const result = await this.campaignsUpload.processCsvFile(file.path);
    return result;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.campaignsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCampaignDto: UpdateCampaignDto,
  ) {
    return this.campaignsService.update(+id, updateCampaignDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.campaignsService.remove(+id);
  }
}
