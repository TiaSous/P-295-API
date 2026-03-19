import { IsString, IsNumber, IsOptional, Min, Max } from "class-validator";

// DTO for creating a comment - fk_utilisateur comes from req.user
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

// DTO for updating a comment
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
