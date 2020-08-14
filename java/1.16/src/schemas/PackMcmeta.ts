import {
  Force,
  Mod,
  NumberNode,
  ObjectNode,
  Reference,
  SchemaRegistry,
  CollectionRegistry,
} from '@mcschema/core'

export function initPackMcmetaSchemas(schemas: SchemaRegistry, _: CollectionRegistry) {
  const getSimpleString = (jsonText: any): string => jsonText instanceof Array ? getSimpleString(jsonText[0]) : jsonText?.text ?? jsonText?.toString() ?? ''

  schemas.register('pack_mcmeta', Mod(ObjectNode({
    pack: Force(Mod(ObjectNode({
      pack_format: Force(Mod(NumberNode({ integer: true, min: 6, max: 6 }), { default: () => 6 })),
      description: Force(Reference(schemas, 'text_component'))
    }), {
      default: () => ({
        pack_format: 6,
        description: ''
      })
    }))
  }), {
    default: () => ({
      pack: {
        pack_format: 6,
        description: ''
      }
    })
  }))
}
