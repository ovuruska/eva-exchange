import { Share } from '@Eva/Common/Entities/Share';
import { OmitType } from '@nestjs/swagger';

export class CreateShareDto extends OmitType(Share, ['id']) {}
