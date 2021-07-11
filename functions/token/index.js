const jwt = require('jsonwebtoken');
const PASS = '7gZxklURWhBhU3BKlaht'

exports.tokenSign = ((user) => {
  return jwt.sign(user, PASS, {
    expiresIn: '2h',
  });
});

exports.tokenValidate = ((token) => {

  return new Promise(async (resolve, reject) => {

    jwt.verify(token, PASS, async function (err, decoded) {
      if (err) {
        reject({
          valid: false,
          message: err.message,
        });
      }
      resolve({
        valid: true,
        decoded,
      });
    });
  });
});