import { Elysia,Handler,t } from 'elysia';
import  Country,{ ICountry } from "../database/models/countries.schema";
import countriesModule from '../modules/countries.module';

export const countriesController = new Elysia({prefix: '/countries'})
    
    .get('/loadCountries', async () => {
        countriesModule.loadCountries();
        return { message: 'Function worked' };
    })
    .get('/search', async ({ query }) => {
        const name =  query.name;
        const countries = await Country.find({ name: { $regex: name, $options: 'i' } });
        return { countries };
    })
    
   