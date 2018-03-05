const avro = require('avsc');

/**
 * Schema definition of the demo message structure.
 */
const demoMessageSchema = avro.Type.forSchema({
  type: 'record',
  name: 'DemoMessage',
  fields: [
    {name: 'to', type: 'string'},
    {name: 'subject', type: 'string'},
    {name: 'content', type: 'string'},
    {name: 'timestamp', type: 'long'}
  ]
});

export { demoMessageSchema };
