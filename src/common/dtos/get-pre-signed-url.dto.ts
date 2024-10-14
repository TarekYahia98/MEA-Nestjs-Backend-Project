import { IsString, Matches } from 'class-validator';

export class GetPreSignedUrlQueryDto {
  @IsString()
  @Matches(/^[a-zA-Z0-9]+\.(jpg|jpeg|png|pdf)$/)
  filename: string;
}