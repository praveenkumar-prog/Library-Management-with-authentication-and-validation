const { z } = require("zod");

const userZodSchema = z.object({
  username: z.string().min(1),
  firstname: z.string(),
  lastname: z.string(),
  age: z.number().int(),
  email: z.string().email(),
  mobile: z.number(),
  address: z.string().min(1).max(100),
  gender: z.enum(["male", "female"]),
  password: z.string().min(6),
});

module.exports = userZodSchema;
