import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { ShareService } from '@Eva/Share/Services/Share';
import { CreateShareDto } from '@Eva/Share/Dto/Requests/CreateShareDto';
import { UpdateShareDto } from '@Eva/Share/Dto/Requests/UpdateShareDto';

@Controller('shares')
@ApiTags('shares')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @Post()
  @ApiOperation({ summary: 'Create a share' })
  @ApiOkResponse({ description: 'The share has been successfully created.' })
  @ApiConflictResponse({ description: 'The share already exists.' })
  public async createShare(@Body() request: CreateShareDto) {
    const { symbol, price } = request;
    return this.shareService.createShare(symbol, price);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'Update a share price' })
  @ApiParam({
    name: 'id',
    description: 'Share Id',
    example: 1,
  })
  @ApiOkResponse({ description: 'The share has been successfully updated.' })
  @ApiNotFoundResponse({ description: 'The share does not exist.' })
  public async updateShare(
    @Body() request: UpdateShareDto,
    @Param('id') id: number,
  ) {
    const { price } = request;
    return this.shareService.updateShare(id, price);
  }
}
