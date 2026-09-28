export type ViewMode = 
  | 'landing'
  | 'login'
  | 'register'
  | 'admin-dashboard'
  | 'institution-dashboard'
  | 'verify-document';

export type InstitutionStatus = 'APPROVED' | 'PENDING' | 'SUSPENDED';

export interface Institution {
  id: string;
  name: string;
  type: string;
  city: string;
  country: string;
  email: string;
  responsibleName: string;
  responsibleEmail: string;
  status: InstitutionStatus;
  registeredAt: string;
}

export interface OfficialDocument {
  code: string;
  title: string;
  studentName: string;
  issueDate: string;
  institutionName: string;
  hash: string;
  status: 'VALID' | 'REVOKED' | 'EXPIRED';
}
