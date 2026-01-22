import * as z from "zod";

export const DocumentSchema = z.object({
  title: z.string().max(200),
  user_id: z.uuid(),
  is_archived: z.boolean().default(false),
  parent_document: z.uuid().nullable().optional(),
  content: z.string().optional(),
  cover_image: z.url().optional().or(z.literal("")),
  icon: z.string().optional(),
  is_published: z.boolean().default(false),
});

// For creating a new document
export const InsertDocumentSchema = DocumentSchema.omit({ user_id: true });

export type Document = z.infer<typeof DocumentSchema> & {
  id: string;
  created_at: Date;
  updated_at: Date;
};

// RESPONSE
export interface RecursiveDocumentResponse {
  id: string;
  user_id: string;
  title: string;
  content?: string | null;
  cover_image?: string | null;
  icon?: string | null;
  parent_document?: string | null;
  is_archived: boolean;
  is_published: boolean;
  created_at: Date;
  updated_at: Date;
  children?: RecursiveDocumentResponse[];
}
