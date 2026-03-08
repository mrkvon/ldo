import type { LdoJsonldContext } from "@ldo/ldo";

/**
 * =============================================================================
 * bookContext: JSONLD Context for book
 * =============================================================================
 */
export const bookContext: LdoJsonldContext = {
  type: {
    "@id": "@type",
    "@isCollection": true,
  },
  Book: {
    "@id": "https://ldo.js.org/Book",
    "@context": {
      type: {
        "@id": "@type",
        "@isCollection": true,
      },
      label: {
        "@id": "https://ldo.js.org/label",
        "@type": "https://ldo.js.org/string",
      },
    },
  },
  label: {
    "@id": "https://ldo.js.org/label",
    "@type": "https://ldo.js.org/string",
  },
};
