export const glue_tables = [
  {
    name: 'person',
    prefix: 'person',
    columns: [
      { name: 'id', type: 'int' },
      { name: 'name', type: 'string' },
    ],
  },
  {
    name: 'transaction',
    prefix: 'transaction',
    columns: [
      { name: 'name', type: 'string' },
      { name: 'gender', type: 'string' },
      { name: 'credit', type: 'float' },
    ],
  },
];