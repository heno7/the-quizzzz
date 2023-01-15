const Joi = require("joi");

const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{8,30}$")).required(),

  repeat_password: Joi.ref("password"),
}).with("password", "repeat_password");

// (async () => {
//   try {
//     const value = await registerSchema.validateAsync({
//       username: "abc",
//       email: "testuser10@gmail.com",
//     });
//     console.log(value);
//   } catch (err) {
//     console.log(err);
//   }
// })();

module.exports = { registerSchema };
