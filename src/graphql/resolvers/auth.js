import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../../models/User';

export const AuthMutations = {
  createUser: async (_, { userInput }) => {
    const { email, password } = userInput;
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

    // eslint-disable-next-line no-underscore-dangle
    return { ...result._doc, password: null, _id: result.id };
  },
};

export const AuthQueries = {
  Users: (parent, args, context) => {
    if (!context.user) {
      throw new Error('You need to login');
    }

    return User.find();
  },
  login: async (_, { email, password }) => {
    const matchedUser = await User.findOne({ email });
    if (!matchedUser) {
      throw new Error(`No user is registered by email ${email}`);
    }
    const passCheck = await bcrypt.compare(password, matchedUser.password);
    if (!passCheck) {
      throw new Error('Incorrect password');
    }
    const token = jwt.sign(
      { userId: matchedUser.id, email: matchedUser.email },
      process.env.TOKEN_SECRET,
      {
        expiresIn: '1h',
      },
    );
    return { userId: matchedUser.id, token, tokenExpiration: 1 };
  },
};
