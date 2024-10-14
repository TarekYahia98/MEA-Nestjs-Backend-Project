import { IsString } from 'class-validator';

export class LocalizedText {
  @IsString()
  en: string;

  @IsString()
  ar: string;
}