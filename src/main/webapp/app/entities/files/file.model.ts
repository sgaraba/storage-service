export interface FileModel {
  id: number;
  name: string;
  data?: string[] | null;
  mimeType: string;
  createdBy: string;
  createdDate: Date;
}
