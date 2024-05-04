import { Elysia,Handler,t } from 'elysia';
import User, { IUser } from '../database/models/users.schema';
import { jwt } from '@elysiajs/jwt';
import { cookie } from '@elysiajs/cookie';
import  Country,{ ICountry } from "../database/models/countries.schema";

export const usersController = new Elysia({prefix: '/users'})
    .use(jwt({
        name: 'jwt',
        secret: process.env.JWT_SECRET as string,
        exp: '7d'
    }))
    .get('/me', async ({jwt,set,cookie}) => {
      const token = cookie;
       console.log(token);
      const result = await jwt.verify("eyJhbGciOiJIUzI1NiJ9.eyJpZCI6IjY2MmRhYzhlNDI3NmUzNWJkNzlkOTY4YiIsImV4cCI6MTcxNDg3NjAwMn0.UjNBroJQAR_R-c0Eee7L79nmQ-AzmVVA88JnVaU8vAQ");
      if (result !== false) {
        const id = result.id;
        const user = await User.findById(id);
        const country = await Country.findById(user?.countryID);
        if (!user) {
            return { error: 'User not found' };
        }
        set.status = 200;
        return { firstname: user.firstName, lastname: user.lastName, email: user.email, countryName: country?.name,countryFlag: country?.flag };
      }
})
    
  