import type { Schema } from "shexj";

/**
 * =============================================================================
 * bookSchema: ShexJ Schema for book
 * =============================================================================
 */
export const bookSchema: Schema = {
  type: "Schema",
  shapes: [
    {
      id: "https://ldo.js.org/#Book",
      type: "ShapeDecl",
      shapeExpr: {
        type: "Shape",
        expression: {
          type: "EachOf",
          expressions: [
            {
              type: "TripleConstraint",
              predicate: "http://www.w3.org/1999/02/22-rdf-syntax-ns#type",
              valueExpr: {
                type: "NodeConstraint",
                values: ["https://ldo.js.org/Book"],
              },
              annotations: [
                {
                  type: "Annotation",
                  predicate: "https://ldo.js.org/comment",
                  object: {
                    value:
                      "A book contains (implicitly) zero to many translations",
                  },
                },
              ],
            },
            {
              type: "TripleConstraint",
              predicate: "https://ldo.js.org/label",
              valueExpr: {
                type: "NodeConstraint",
                datatype: "https://ldo.js.org/string",
              },
              annotations: [
                {
                  type: "Annotation",
                  predicate: "https://ldo.js.org/comment",
                  object: {
                    value: "The label/title of this book",
                  },
                },
              ],
            },
          ],
        },
      },
    },
  ],
};
