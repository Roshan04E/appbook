"use server";

import {
  DocumentSchema,
  InsertDocumentSchema,
} from "@/app/(applications)/synapse/types";
import { auth } from "@/auth";
import z from "zod";

import pgClientPool from "../../pg-client-pool";

const db = await pgClientPool();

export async function getDocumentTree(rootId?: string | null) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");
    const userId = session.user.id;

    const query = rootId
      ? `
        WITH RECURSIVE document_tree AS (
            SELECT * FROM documents
            WHERE id = $1 AND user_id = $2

            UNION ALL

            SELECT d.*
            FROM documents d
            INNER JOIN document_tree dt
              ON d.parent_document = dt.id
            WHERE d.is_archived = false
        )
        SELECT * FROM document_tree
        ORDER BY created_at DESC;
      `
      : `
        WITH RECURSIVE document_tree AS (
            SELECT * FROM documents
            WHERE parent_document IS NULL
              AND user_id = $1

            UNION ALL

            SELECT d.*
            FROM documents d
            INNER JOIN document_tree dt
              ON d.parent_document = dt.id
            WHERE d.is_archived = false
        )
        SELECT * FROM document_tree
        ORDER BY created_at DESC;
      `;

    const params = rootId ? [rootId, userId] : [userId];

    const result = await db.query(query, params);

    return {
      success: true,
      data: result.rows as Document[],
      message: "Document tree fetched successfully",
    };
  } catch (error) {
    console.error("Tree Fetch Error:", error);
    return { success: false, data: null, message: "Failed to fetch tree" };
  }
}

export async function getDocumentById(id: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("UNAUTHENTICATED");

    const res = await db.query(`SELECT * FROM documents WHERE id = $1`, [id]);

    if (!res.rows[0]) {
      return { success: false, data: null, message: "Document not found" };
    }

    const doc = res.rows[0];

    if (doc.user_id !== session.user.id) {
      throw new Error("UNAUTHORIZED");
    }

    if (doc.is_archived) {
      return { success: true, data: doc, message: "Document is archived" };
    }

    if (!doc.is_published) {
      return { success: true, data: doc, message: "Document is not published" };
    }

    return {
      success: true,
      data: doc,
      message: "Document fetched successfully",
    };
  } catch (e) {
    return { success: false, data: null, message: "Some error occurred" };
  }
}

export async function createDocument(
  data: z.infer<typeof InsertDocumentSchema>,
) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");
    const user_id = session.user.id;

    const cleanData = DocumentSchema.parse({ ...data, user_id });

    // create new Document
    const result = await db.query(
      `INSERT INTO documents
            (title, user_id, is_archived, parent_document, content, cover_image, icon, is_published)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
            RETURNING *`,
      [
        cleanData.title,
        session.user.id,
        cleanData.is_archived,
        cleanData.parent_document ?? null,
        cleanData.content ?? null,
        cleanData.cover_image ?? null,
        cleanData.icon ?? null,
        cleanData.is_published,
      ],
    );
    const newDocument = result.rows[0];

    return {
      success: true,
      data: newDocument,
      message: "Notes created successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: null,
      message: "Failed to create notes",
    };
  }
}
// update document
export async function updateDocumentById(
  id: string,
  updates: Partial<{
    title: string;
    content: string;
    cover_image: string;
    icon: string;
    is_archived: boolean;
    is_published: boolean;
  }>,
) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("UNAUTHENTICATED");

    // Check owner
    const check = await db.query(
      `SELECT user_id FROM documents WHERE id = $1`,
      [id],
    );

    if (!check.rows[0])
      return { success: false, message: "Document not found" };

    if (check.rows[0].user_id !== session.user.id)
      throw new Error("UNAUTHORIZED");

    // Build dynamic query
    const keys = Object.keys(updates);

    if (!keys.length) {
      return { success: false, message: "No fields to update" };
    }

    const values = Object.values(updates);
    const setQuery = keys.map((k, i) => `${k} = $${i + 1}`).join(", ");

    const res = await db.query(
      `UPDATE documents
       SET ${setQuery}, updated_at = NOW()
       WHERE id = $${keys.length + 1}
       RETURNING *`,
      [...values, id],
    );

    return {
      success: true,
      data: res.rows[0],
      message: "Document updated",
    };
  } catch (err) {
    console.error(err);
    return { success: false, data: null, message: "Update failed" };
  }
}

export async function deleteDocument(id: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Unauthorized");
    const user_id = session.user.id;

    const result = await db.query(
      `DELETE FROM documents
       WHERE id = $1 AND user_id = $2
       RETURNING *`,
      [id, user_id],
    );

    const deleted = result.rows[0];

    if (!deleted) {
      return {
        success: false,
        data: null,
        message: "Document not found",
      };
    }

    return {
      success: true,
      data: deleted,
      message: "Document deleted successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      data: null,
      message: "Failed to delete document",
    };
  }
}
