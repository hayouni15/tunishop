import Commerce from "@chec/commerce.js";

let publickey = process.env.REACT_APP_CHEC_PUBLIC_KEY
export const commerce = new Commerce('pk_4148728f63a2367f1337152d70d260542e97791f15b18', true)