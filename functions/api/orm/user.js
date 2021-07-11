const {
  connectMongo,
} = require("./connection");
const {
  UserSchema
} = require("./schema");

/**
 * This class controls the User's collection. 
 * You can filter by e-mail and password or 
 * just e-mail. You can also register 
 * and update an user.
 * @name User
 * @class
 * @const
 * @namespace Mongoose
 */

class User {

  /**
   * Returns user by email
   * @param  {string} email  [Email]
   */
  async getByEmail(email) {

    if (!email.trim()) {
      throw new Error('Email cannot be empty');
    }

    return await connectMongo(async function () {
      try {
        const user = await UserSchema.findOne({
          email
        });

        return {
          success: user !== null,
          user,
        }
      } catch (error) {
        console.log(error);
      }
    });
  }

  /**
   * Create a new user
   * @param  {string} email  [Email]
   * @example
   * const user = {
   *      name: 'Eduardo',
   *      email: 'eduardo@yourmail.com',
   *      passowrd: '123456'
   * }  
   * const obj = await User.insert(user);
   */
  async insert(user) {

    if (!user) {
      throw new Error('User is undefined');
    }

    return await connectMongo(async function () {

      const snapshot = new UserSchema({
        name: user.name,
        email: user.email,
        password: user.password,
        access_token: user.access_token,
        refresh_token: user.refresh_token,
      });

      try {
        const res = await snapshot.save();
        return {
          success: true,
          user: res,
        }

      } catch (error) {
        let message = error.message;
        if (message.includes('duplicate key error')) {
          message = 'Email already exists';
        }
        throw new Error(message);
      }
    });
  }

  /**
   * Update a user by id
   * @param  {string} _id  [Pass the user id]
   * @param  {object} user  [Pass the object user]
   */
  async update(_id, user) {

    if (!_id) {
      throw new Error('Id is undefined');
    }

    if (!user) {
      throw new Error('User is undefined');
    }

    return await connectMongo(async function () {
      try {
        const doc = await UserSchema.findByIdAndUpdate(_id, user);
        return {
          success: true,
          user: doc,
        }
      } catch (error) {
        return {
          success: false,
          error,
        }
      }
    });
  }
}

const user = new User();
exports.User = user;
