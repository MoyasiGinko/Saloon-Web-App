import { Request, Response, NextFunction } from 'express';

const loggerMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  
  const startTime = new Date().getTime();
  console.log( `[${new Date().toISOString()}] ${req.method} ${req.url}`);

  res.on ('finish', ()=> {
    const endTime = new Date().getTime();
    console.log(`[${new Date().toISOString()}], Response: ${res.statusCode}, Time Taken: ${endTime - startTime}ms`)
  })
  next();
}

export default loggerMiddleWare;