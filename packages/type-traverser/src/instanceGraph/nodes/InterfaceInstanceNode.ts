/* eslint-disable @typescript-eslint/no-explicit-any */
import type { InterfaceType, TraverserTypes } from "../../TraverserTypes";
import type { InstanceNodeFor } from "./createInstanceNodeFor";
import { InstanceNode } from "./InstanceNode";

type InterfacePropertyNode<
  Types extends TraverserTypes<any>,
  Type extends InterfaceType<keyof Types>,
  PropertyName extends keyof Type["properties"],
> = Type["type"][PropertyName] extends Array<any>
  ? InstanceNodeFor<Types, Type["properties"][PropertyName]>[]
  : InstanceNodeFor<Types, Type["properties"][PropertyName]>;

export class InterfaceInstanceNode<
  Types extends TraverserTypes<any>,
  TypeName extends keyof Types,
  Type extends InterfaceType<keyof Types> & Types[TypeName],
> extends InstanceNode<Types, TypeName, Type> {
  private children: {
    [PropertyName in keyof Type["properties"]]: InterfacePropertyNode<
      Types,
      Type,
      PropertyName
    >;
  };

  public _setChild<PropertyName extends keyof Type["properties"]>(
    propertyName: PropertyName,
    child: InterfacePropertyNode<Types, Type, PropertyName>,
  ): void {
    this.children[propertyName] = child;
  }

  public child<PropertyName extends keyof Type["properties"]>(
    propertyName: PropertyName,
  ): InterfacePropertyNode<Types, Type, PropertyName> {
    return this.children[propertyName];
  }

  public allChildren(): InstanceNodeFor<
    Types,
    Type["properties"][keyof Type["properties"]]
  >[] {
    return Object.values(this.children).flat();
  }

  public _recursivelyBuildChildren() {
    Object.entries(this.instance).forEach(
      ([propertyName, value]: [keyof Type["properties"], unknown]) => {
        const initChildNode = (val: unknown) => {
          const node = this.graph.getNodeFor(val, this.typeName);
          // Fancy typescript doesn't work until you actually give it a type
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          node._setParent([this.typeName, propertyName], this);
          return node;
        };
        const childNode = (Array.isArray(value)
          ? value.map((val) => initChildNode(val))
          : initChildNode(value)) as unknown as InterfacePropertyNode<
          Types,
          Type,
          keyof Type["properties"]
        >;
        this._setChild(propertyName, childNode);
      },
    );
  }
}
