import { namedNode, quad } from "@ldo/rdf-utils";
import type { BlankNode, NamedNode } from "@ldo/rdf-utils";
import { addObjectToDataset } from "../util/addObjectToDataset";
import { deleteValueFromDataset } from "./deleteFromDataset";
import {
  _getUnderlyingDataset,
  _getUnderlyingNode,
  _proxyContext,
  _writeGraphs,
} from "../types";
import { getValueForKey } from "./getValueForKey";
import type { ProxyContext } from "../ProxyContext";

export interface SubjectProxyTarget {
  "@id": NamedNode | BlankNode;
}

export function createSubjectHandler(
  initialProxyContext: ProxyContext,
): ProxyHandler<SubjectProxyTarget> {
  let proxyContext = initialProxyContext;
  return {
    get(target: SubjectProxyTarget, key: string | symbol) {
      switch (key) {
        case _getUnderlyingDataset:
          return proxyContext.dataset;
        case _getUnderlyingNode:
          return target["@id"];
        case _proxyContext:
          return proxyContext;
        case _writeGraphs:
          return proxyContext.writeGraphs;
        case "@context":
          return proxyContext.contextUtil.context;
      }
      return getValueForKey(target, key, proxyContext);
    },
    getOwnPropertyDescriptor(target: SubjectProxyTarget, key: string) {
      return {
        value: getValueForKey(target, key, proxyContext),
        writable: true,
        enumerable: true,
        configurable: true,
      };
    },
    ownKeys(target) {
      const subject = target["@id"];
      const tripleDataset = proxyContext.dataset.match(subject);
      const keys: Set<string> = new Set(["@id"]);
      tripleDataset.toArray().forEach((quad) => {
        keys.add(proxyContext.contextUtil.iriToKey(quad.predicate.value));
      });
      return Array.from(keys);
    },
    set: (target: SubjectProxyTarget, key, value) => {
      if (key === _proxyContext) {
        proxyContext = value;
        return true;
      }
      if (key === "@id" && typeof value === "string") {
        // Replace Subject Quads
        const currentSubjectQuads = proxyContext.dataset
          .match(target["@id"])
          .toArray();
        const newSubjectQuads = currentSubjectQuads.map((curQuad) =>
          quad(
            namedNode(value),
            curQuad.predicate,
            curQuad.object,
            curQuad.graph,
          ),
        );
        currentSubjectQuads.forEach((curQuad) =>
          proxyContext.dataset.delete(curQuad),
        );
        proxyContext.dataset.addAll(newSubjectQuads);
        // Replace Object Quads
        const currentObjectQuads = proxyContext.dataset
          .match(undefined, undefined, target["@id"])
          .toArray();
        const newObjectQuads = currentObjectQuads.map((curQuad) =>
          quad(
            curQuad.subject,
            curQuad.predicate,
            namedNode(value),
            curQuad.graph,
          ),
        );
        currentObjectQuads.forEach((curQuad) =>
          proxyContext.dataset.delete(curQuad),
        );
        proxyContext.dataset.addAll(newObjectQuads);
        target["@id"] = namedNode(value);
      }
      addObjectToDataset(
        { "@id": target["@id"], [key]: value },
        true,
        proxyContext,
      );
      return true;
    },
    deleteProperty(target, key) {
      return deleteValueFromDataset(target, key, proxyContext);
    },
  };
}
