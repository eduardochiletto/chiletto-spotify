const mongoose = require('mongoose');
const password = '[YOURMONGOPASSWORD]';
const database = '[YOURMONGODATABASE]';

const uri = `mongodb+srv://${database}:${password}@cluster0.ihflv.mongodb.net/${database}?retryWrites=true&w=majority`;

let db = undefined;



/**
 * This method connects to the MongoDB
 * @name connectMongo
 * @function
 * @const
 * @namespace Mongoose
 * @param  {object} successCallback [Method callback]
 */
exports.connectMongo = async function (successCallback) {

  return new Promise((resolve, reject) => {

    if (db !== undefined) {
      if (successCallback) {
        resolve(successCallback());
      } else {
        resolve();
      }
      return;
    }

    mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    db = mongoose.connection;

    db.on('error', () => {
      console.error.bind(console, 'connection error:');
      reject('connection error');
    });

    db.once('open', () => {

      if (successCallback) {
        resolve(successCallback());
      } else {
        resolve();
      }
    });
  });
}