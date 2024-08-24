import { Hono } from 'hono'
import {cors} from 'hono/cors'
import {userRouter} from './routes/user';
import { blogRouter } from './routes/blog';


const app= new Hono<{
  Bindings:{
    DATABASE_URL:string;
    JWT_SECRET:string;
  }
}>();

app.use("/*",cors())
app.route('/api/v1/user',userRouter);
app.route('/api/v1/blog',blogRouter);


export default app  

//postgresql://medium_owner:F8KhzU5vTGjb@ep-withered-snowflake-a4y1iyjs.us-east-1.aws.neon.tech/medium?sslmode=require

// DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlfa2V5IjoiMmRiY2ViNzgtY2VjYi00MzA1LTk5MGMtNmJiMDc5Y2EzM2U5IiwidGVuYW50X2lkIjoiNTcwNDNjMmU2YmE1NGM0NGI2YzI4ZjBlNDVkN2QwZTQ3N2Y1YTFlNTYxZDk5ODNmNjI4YzQ0OTQ3MDJiYzU1NSIsImludGVybmFsX3NlY3JldCI6ImYwM2M2MmI2LWQ4MGEtNDU2MC04OTBiLWJlZmEwMmUyNjc5OSJ9.hTf9TwVqCv4Z27TNyGOh6Tdioyj0AJWUWN1OhyLWU4s"