import Country,{ ICountry } from "../database/models/countries.schema";

export default class countriesModule  {
    static async loadCountries() {
        try{
            const path = "/Users/mac/Documents/dev/api/restful/hanyu-dictionari/src/assets/countries.json";
            const file = Bun.file(path);
            
            const contents = await file.json();
            
            for (const country of contents.countries) {
                const newCountry = new Country({
                    name: country.country_name, 
                    shortName: country.country_short_code, 
                    flag: country.country_emoji});
                await newCountry.save();
            }
        }
        catch(e){
            console.log(e)
        }
        
    }

    
}