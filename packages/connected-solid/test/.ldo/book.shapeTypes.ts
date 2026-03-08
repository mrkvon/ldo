import type { ShapeType } from "@ldo/ldo";
import { bookSchema } from "./book.schema";
import { bookContext } from "./book.context";
import type { Book } from "./book.typings";

/**
 * =============================================================================
 * LDO ShapeTypes book
 * =============================================================================
 */

/**
 * Book ShapeType
 */
export const BookShapeType: ShapeType<Book> = {
  schema: bookSchema,
  shape: "https://ldo.js.org/#Book",
  context: bookContext,
};
