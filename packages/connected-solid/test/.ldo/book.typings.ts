import type { LdoJsonldContext, LdSet } from "@ldo/ldo";

/**
 * =============================================================================
 * Typescript Typings for book
 * =============================================================================
 */

/**
 * Book Type
 */
export interface Book {
  "@id"?: string;
  "@context"?: LdoJsonldContext;
  type: LdSet<{
    "@id": "Book";
  }>;
  label: string;
}
