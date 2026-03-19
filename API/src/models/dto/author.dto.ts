import { IsString, IsOptional } from "class-validator";

// DTO for creating an author
export class CreateEcrivainDto {
  @IsString()
  ecrNom!: string;

  @IsString()
  ecrPrenom!: string;
}

// DTO for updating an author
export class UpdateEcrivainDto {
  @IsOptional()
  @IsString()
  ecrNom?: string;

  @IsOptional()
  @IsString()
  ecrPrenom?: string;
}

// DTO for creating a publisher
export class CreateEditeurDto {
  @IsString()
  ediNom!: string;
}

// DTO for updating a publisher
export class UpdateEditeurDto {
  @IsOptional()
  @IsString()
  ediNom?: string;
}
