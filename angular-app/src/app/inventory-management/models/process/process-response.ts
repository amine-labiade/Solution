export interface ProcessResponse {
  id: string;
  name?: string;
  description?: string;
  creationDate?: string;
  type?: string;
  state?: string;
  isFavorite?: boolean;
  isArchived: boolean;
}
