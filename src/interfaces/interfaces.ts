export interface Pet {
  id: number;
  name: string;
  kind: string;
  weight: number;
  height: number;
  length: number;
  photo_url: string;
  description: string;
  number_of_lives?: number;
}

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
