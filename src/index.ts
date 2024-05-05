import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import './database/db.setup';

import { usersController } from "./routes/users.controller";
import { authController } from "./routes/auth.controller";
import {countriesController} from "./routes/countries.controller";


const app = new Elysia()
.use(swagger())
.use(cors({origin: '*', methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization']}))
.use(countriesController)
.use(usersController)
.use(authController)
.listen(3000)


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
