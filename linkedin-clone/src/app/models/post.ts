import { IProfile } from "./profile"

export interface IPost {

  _id:string
  text:string
  username:string
  user:IProfile
  createdAt:string
  updatedAt:string
  _v:number
}
