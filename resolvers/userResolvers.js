import jwt from "jsonwebtoken";

export const userResolvers = {
  Query: {
    users: async (_, __, { rows }) => {
      const users = await rows.filter((item) => item);
      return users;
    },

    user: async (_, { id }, { rows }) => {
      const user = await rows.find((user) => user.id == id);
      return user;
    },
  },
  Mutation: {
    login(_, { email, password }, { rows }) {
      const user = rows.find(
        (user) => user.email === email && user.password === password
      );

      if (!user) {
        return {
          success: false,
          message: "Invalid Credentials",
          accessToken: null,
        };
      }

      const userRoles = user.userroles;

      const token = jwt.sign(
        {
          "https://localhost:4000/": { userRoles },
        },
        "SUPER_SECRET",
        {
          algorithm: "HS256",
          subject: "id",
          expiresIn: "1d",
        }
      );

      return {
        success: true,
        message: "Login successful",
        accessToken: {
          accessToken: token,
          tokenType: "Bearer",
          algorithm: "HS256",
          subject: "id",
          expiresIn: "1d",
          userroles: userRoles,
        },
      };
    },
  },
};
