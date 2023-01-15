const Joi = require("joi");
const { registerSchema } = require("./auth.validations");
const {
  User,
  Sequelize: { Op },
} = require("../databases/models");

const { JWT, bcrypt } = require("../utils/utils");

module.exports = {
  register: async (req, res, next) => {
    try {
      const validatedReqBody = await registerSchema.validateAsync(req.body);
      const { username, email, password } = validatedReqBody;
      const oldUser = await User.findOne({
        where: {
          [Op.or]: [{ username: username }, { email: email }],
        },
      });
      if (oldUser && oldUser.username === username) {
        return res.status(400).json({
          message:
            "Opps! username has been used, please choose difference usernames",
        });
      }
      if (oldUser && oldUser.email === email) {
        return res.status(400).json({
          message:
            "Opps! username has been used, please choose difference usernames",
        });
      }

      const hashedPassword = await bcrypt.hashPassword(password);

      const newUser = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      const access_token = await JWT.signPromise(
        {
          id: newUser.userId,
          username: newUser.username,
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "30m",
        }
      );
      return res.status(200).json({
        access_token,
      });
    } catch (error) {
      if (error instanceof Joi.ValidationError) {
        return res.status(400).json({ message: error.details[0].message });
      }
      next(error);
    }
  },
  login: async (req, res, next) => {},
  getAccessToken: async (req, res, next) => {},
  logout: async (req, res, next) => {},
};
