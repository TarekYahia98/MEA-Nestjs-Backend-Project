import { IsEnum, IsString, IsUrl } from 'class-validator';
import { MediaTypeEnum } from './media.enum';

export class Media {
  @IsString()
  @IsEnum(MediaTypeEnum)
  type: MediaTypeEnum;

  @IsString()
  @IsUrl()
  url: string;
}