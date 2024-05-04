import { jwt } from '@elysiajs/jwt';
import { Elysia,Handler,t } from 'elysia';
import User, { IUser } from '../database/models/users.schema';
import { cookie } from '@elysiajs/cookie';
import authModule from '../modules/auth.module'; 

export const authController = new Elysia({prefix: '/auth'})
    .use(cookie())
    .use(jwt({
        name: 'jwt',
        secret: process.env.JWT_SECRET as string,
        exp: '7d'
    }))
    .get('/test', async () => {
        return { message: 'Hello World!' };
    })
    .post('/signIn', async ({jwt,cookie:{auth},body,set}) => {
        body: t.Object({
            email: t.String(),
            password: t.String(),
        });

        const { password, email } = body as { password: string, email: string };

        const user = await User.findOne({ email });
        if (!user) {
            return { error: 'User not found' };
        }
       
        const isValid = await authModule.verifyPassword(password,user.password);
        if (!isValid) {
            return { error: 'Invalid password' };
        }

        set.status = 200;
        auth.value = await jwt.sign({id: user._id}), { expires: new Date(Date.now() + 604800000)};

    })
    .post('/signUp', async ({jwt,cookie:{auth},body,set}) => { 
        try {
            body: t.Object({
                firstName: t.String(),
                middleName: t.String(),
                lastName: t.String(),
                countryID: t.String(),
                email: t.String(),
                password: t.String(),
            });

            const requestBody = body as IUser;
            const user = new User({
                firstName: requestBody.firstName,
                middleName: requestBody.middleName,
                lastName: requestBody.lastName,
                countryID: requestBody.countryID,
                email: requestBody.email,
                password: authModule.hashPassword(requestBody.password),
            });
            
            await user.save();

            auth.value = await jwt.sign({id: user._id}), {expires: new Date(Date.now() + 604800000)};
            set.status = 200;
            return user;
        } catch(err) {
            return { error: err };
        }
    })