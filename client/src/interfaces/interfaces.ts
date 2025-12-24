export interface BasePet {
  id: number;
  name: string;
  kind: string;
  weight: number;
  height: number;
  length: number;
  photo_url: string;
  description: string;
}

export interface DogPet extends BasePet {
  kind: "dog";
}

export interface CatPet extends BasePet {
  kind: "cat";
  number_of_lives: number;
}

export interface BirdPet extends BasePet {
  kind: "bird";
  num_of_feathers: number;
  wingspan: number;
}

export type Pet = DogPet | CatPet | BirdPet;

export function isDog(pet: Pet): pet is DogPet {
  return pet.kind === "dog";
}

export function isCat(pet: Pet): pet is CatPet {
  return pet.kind === "cat";
}

export function isBird(pet: Pet): pet is BirdPet {
  return pet.kind === "bird";
}

export type HealthStatus = "unhealthy" | "healthy" | "very healthy";

export type ApiResponse = { rows: Pet[]; totalCount: number };

export interface PetPaginationModel {
  pageSize: number;
  page: number;
}

export type SortOptions = "asc" | "desc"  ;

export interface PetSortModel {
  sortField: string;
  sortOrder: SortOptions
}

export type ApiResponseDetail = Pet;
