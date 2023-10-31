import { Share } from '@Eva/Common/Entities/Share';
import { OmitType } from '@nestjs/swagger';

export class UpdateShareDto extends OmitType(Share, ['id', 'symbol']) {}
