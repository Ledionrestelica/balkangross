export default {
  name: 'featured',
  type: 'document',
  title: 'Featured',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description',
    },
    {
      name: 'products',
      type: 'array',
      title: 'Products',
      of: [{type: 'reference', to: {type: 'product'}}],
    },
  ],
}
