import { IsString, IsNumber, IsOptional, Min, Max } from "class-validator";

export class CreateCommentaireDto {
  @IsNumber()
  @Min(1)
  @Max(5)
  comAppreciation!: number;

  @IsString()
  comCommentaire!: string;

  @IsNumber()
  fk_ouvrage!: number;
}

export class UpdateCommentaireDto {
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  comAppreciation?: number;

  @IsOptional()
  @IsString()
  comCommentaire?: string;

  @IsOptional()
  @IsNumber()
  fk_ouvrage?: number;
}
