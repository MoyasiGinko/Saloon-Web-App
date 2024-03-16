import { Request, Response, NextFunction } from 'express';

const loggerMiddleWare = (req: Request, res: Response, next: NextFunction) => {
  const startTime = new Date().getTime();
  console.log( `[${new Date().toISOString()}] ${req.method} ${req.url}`);

  const requestedData = {
    method : req.method,
    url: req.url,
    body : req.body,
    query : req.query,
    headers : req.headers
  }
  // console.log('Requested data: ', requestedData);
  res.on ('finish', ()=> {
    const endTime = new Date().getTime();
    console.log(`[${new Date().toISOString()}], Response: ${res.statusCode}, Time Taken: ${endTime - startTime}ms`)
  })
  next();
}

export default loggerMiddleWare;