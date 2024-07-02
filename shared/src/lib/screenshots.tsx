/**
 * Stuff to screenshot for the presentation
 */
import {z, ZodError} from "zod";


type User = {
  username: string,
  email: string,
  password: string,
}

function validateUser(user: User): string[] {
  const errors: string[] = [];

  (user.username.length < 8 || user.username.length > 64) && errors.push("Username must be between 8 and 64 characters long.");

  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  !emailRegex.test(user.email) && errors.push("Invalid email format.");

  (user.password.length < 8 || user.password.length > 64) && errors.push("Password must be between 8 and 64 characters long.");
  !/[a-z]/.test(user.password) && errors.push("Password must contain at least one lowercase letter.");
  !/[A-Z]/.test(user.password) && errors.push("Password must contain at least one uppercase letter.");
  !/\d/.test(user.password) && errors.push("Password must contain at least one number.");
  !/[!@#$%^&*(),.?":{}|<>]/.test(user.password) && errors.push("Password must contain at least one special character.")

  return errors;
}

// const UserSchema = z.object({
//   username: z.string()
//     .min(8)
//     .max(64),
//   email: z.string()
//     .email(),
//   password: z.string()
//     .min(8)
//     .max(64)
//     .regex(/.*[a-z].*/, "Password must contain at least one lowercase letter.")
//     .regex(/.*[A-Z].*/, "Password must contain at least one lowercase letter.")
//     .regex(/.*\d.*/, "Password must contain at least one number.")
//     .regex(/.*[!@#$%^&*(),.?":{}|<>].*/, "Password must contain at least one special character.")
// })
// type User = z.infer<typeof UserSchema>
//
// function validateUser(user: User){
//   // {success, data, error}
//   return UserSchema.safeParse(user)
// }
