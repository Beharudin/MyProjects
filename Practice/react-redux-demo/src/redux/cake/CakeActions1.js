import { buy_cakes1 } from "./CakeTypes";

export const buyCakes1=(number=1)=>{
    return{
        type: buy_cakes1,
        payload: number
    }
}