import {
  IsString,
  IsOptional,
  IsNumber,
  Min,
  Max,
  IsDateString,
} from "class-validator";

// DTO pour créer un livre - fk_utilisateur vient de req.user
export class CreateLivreDto {
  @IsString()
  ouvTitre!: string;

  @IsOptional()
  @IsNumber()
  ouvNbPage?: number;

  @IsOptional()
  @IsString()
  ouvResume?: string;

  @IsOptional()
  @IsDateString()
  ouvAnneeEdition?: string;

  @IsOptional()
  @IsString()
  ouvCouverture?: string;

  @IsOptional()
  @IsString()
  ouvExtrait?: string;

  @IsNumber()
  fk_categorie!: number;

  @IsNumber()
  fk_ecrivain!: number;

  @IsNumber()
  fk_editeur!: number;
  // fk_utilisateur vient de req.user - PAS dans le body
}

// DTO pour mettre à jour un livre
export class UpdateLivreDto {
  @IsOptional()
  @IsString()
  ouvTitre?: string;

  @IsOptional()
  @IsNumber()
  ouvNbPage?: number;

  @IsOptional()
  @IsString()
  ouvResume?: string;

  @IsOptional()
  @IsDateString()
  ouvAnneeEdition?: string;

  @IsOptional()
  @IsString()
  ouvCouverture?: string;

  @IsOptional()
  @IsString()
  ouvExtrait?: string;

  @IsOptional()
  @IsNumber()
  fk_categorie?: number;

  @IsOptional()
  @IsNumber()
  fk_ecrivain?: number;

  @IsOptional()
  @IsNumber()
  fk_editeur?: number;
}
