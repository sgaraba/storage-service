import { IDocument, NewDocument } from './document.model';

export const sampleWithRequiredData: IDocument = {
  id: 15115,
  title: 'till mid',
  data: '../fake-data/blob/hipster.png',
  dataContentType: 'unknown',
};

export const sampleWithPartialData: IDocument = {
  id: 5098,
  title: 'eicosanoid gadzooks if',
  data: '../fake-data/blob/hipster.png',
  dataContentType: 'unknown',
};

export const sampleWithFullData: IDocument = {
  id: 28706,
  title: 'eek',
  data: '../fake-data/blob/hipster.png',
  dataContentType: 'unknown',
};

export const sampleWithNewData: NewDocument = {
  title: 'sad',
  data: '../fake-data/blob/hipster.png',
  dataContentType: 'unknown',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
