import "reflect-metadata";
import { createConnection } from  "typeorm"
import {User} from './entity/User';
import {Book} from './entity/Book';

createConnection(
  {
      type: 'mysql',
      host: "localhost",
      port: 3306,
      username: "test",
      password: "test",
      database: "test",
      entities: [
          User,
          Book,
      ],
      synchronize: true,
      logging: false
  }
)
  .then((connection )=>{

  })
  .catch((error )=>{console.log(error)})
