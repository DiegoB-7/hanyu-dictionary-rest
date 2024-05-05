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
    .get('/me', async ({jwt,set,cookie:{auth}}) => {
      const result = await jwt.verify(auth.value);
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
    
  