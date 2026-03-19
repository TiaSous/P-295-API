import { IsString, IsOptional } from "class-validator";

export class CreateEcrivainDto {
  @IsString()
  ecrNom!: string;

  @IsString()
  ecrPrenom!: string;
}

export class UpdateEcrivainDto {
  @IsOptional()
  @IsString()
  ecrNom?: string;

  @IsOptional()
  @IsString()
  ecrPrenom?: string;
}

// DTO pour créer un éditeur
export class CreateEditeurDto {
  @IsString()
  ediNom!: string;
}

// DTO pour mettre à jour un éditeur
export class UpdateEditeurDto {
  @IsOptional()
  @IsString()
  ediNom?: string;
}
