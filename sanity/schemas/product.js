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
      name: 'pricest',
      type: 'number',
      title: 'Price per st',
    },
    {
      name: 'image',
      type: 'image',
      title: 'Image',
    },
    {
      name: 'description',
      type: 'description',
      title: 'description',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
      },
    },
    {
      name: 'brand',
      title: 'Brand',
      type: 'reference',
      to: [{type: 'brand'}],
    },
  ],
}
