import bcrypt from 'bcryptjs';
// const jwt = require('jsonwebtoken');
import User from '../../models/User';

module.exports = {
  createUser: async ({ userInput }) => {
    const { email, password } = userInput;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User exists already.');
      }
      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        ...userInput,
        password: hashedPassword,
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
};
