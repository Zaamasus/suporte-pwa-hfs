export interface Attachment {
  id: string;
  ticket_id: string;
  filename: string;
  originalname: string;
  mimetype: string;
  path: string;
  size: number;
  url: string;
  created_at: string;
}

export interface AttachmentCreate {
  ticket_id: string;
  filename: string;
  originalname: string;
  mimetype: string;
  path: string;
  size: number;
  url: string;
} 