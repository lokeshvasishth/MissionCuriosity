import { Add_Item, GET_Data } from "./ActionType";

export const addCode =(data)=>({
    type:Add_Item,
    payload:data
})

export const Checkdata = (data)=>({
    type:GET_Data,
    payload:data
})