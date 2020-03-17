module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  var d = new Date();

  const MenuSchema = new Schema({
    path: {
      type: String
    },
    name: {
      type: String
    },
    label: {
      type: String
    },
    icon: {
      type: String
    },
    url: {
      type: String
    }
  })
  return mongoose.model('Menu', MenuSchema, 'menu');
}