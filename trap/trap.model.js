const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrapSchema = new Schema({
  trap_id: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  remote_ip: { type: String },
  method: { type: String, required: true },
  scheme: { type: String, required: true },
  body: { type: Object },
  query_params: { type: Object },
  cookies: { type: Object },
  headers: { type: Object, required: true },
},
{
  versionKey: false,
  collection: 'TrapCollection',
});

module.exports = mongoose.model('TrapModel', TrapSchema);
