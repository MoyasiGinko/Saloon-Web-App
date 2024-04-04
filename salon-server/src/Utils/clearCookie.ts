import { Response } from "express"

export const clearCookie = (res: Response, cookieName: string) => {
  res.clearCookie(cookieName)
  return res.status(200).json({message: 'cookie cleared successfully'})
}