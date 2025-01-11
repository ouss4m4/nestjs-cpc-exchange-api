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
  // UseGuards,
} from '@nestjs/common';
import { CampaignsService } from './campaigns.service';
import { CreateCampaignDto } from './dto/create-campaign.dto';
import { UpdateCampaignDto } from './dto/update-campaign.dto';
import { FindAllCampaignsDto } from './types';
import { ICampaignListReponse } from 'src/shared/types';
import { Response } from 'express';
// import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
// @UseGuards(JwtAuthGuard)
@Controller('campaigns')
export class CampaignsController {
  constructor(private readonly campaignsService: CampaignsService) {}

  @Post()
  create(@Body() createCampaignDto: CreateCampaignDto) {
    return this.campaignsService.create(createCampaignDto);
  }

  @Get()
  async findAll(
    @Query() query: FindAllCampaignsDto,
  ): Promise<ICampaignListReponse> {
    return await this.campaignsService.findAll(query);
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
