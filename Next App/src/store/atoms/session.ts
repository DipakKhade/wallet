
import { userInfo } from "os";
import { atom } from "recoil";

interface UserInfo{
    name ?:string
    profileImage ? :string
}

export const userInfoAtom = atom({
    key:'userInfo',
    default:{
        profileImage:'',
        name:''
    }
})


export const current_sessionAtom = atom({
    key:'current_session',
    default:null
})

