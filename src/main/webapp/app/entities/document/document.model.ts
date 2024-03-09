export interface IDocument {
  id: number;
  title?: string | null;
  data?: string | null;
  dataContentType?: string | null;
}

export type NewDocument = Omit<IDocument, 'id'> & { id: null };
