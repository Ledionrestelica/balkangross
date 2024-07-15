export default {
  name: 'product',
  type: 'document',
  title: 'Product',
  fields: [
    {
      name: 'articleNumber',
      type: 'string',
      title: 'Article Number',
    },
    {
      name: 'name',
      type: 'string',
      title: 'Name',
    },
    {
      name: 'ean',
      type: 'number',
      title: 'EAN',
    },
    {
      name: 'active',
      type: 'boolean',
      title: 'Active',
    },
    {
      name: 'unit',
      type: 'string',
      title: 'Unit',
    },
    {
      name: 'vikt',
      type: 'string',
      title: 'Vikt',
    },
    {
      name: 'price',
      type: 'number',
      title: 'Price',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
      },
    },
  ],
}
