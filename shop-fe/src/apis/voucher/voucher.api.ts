"use server";
import { api } from "@/helpers/api.helper";
import { IVoucher } from "@/interfaces/voucher/voucher.interface";
import { CONST_METHODS } from "@/shared/constants/routes/methods.constants";
import { ROUTE_CONTROLLERS } from "@/shared/constants/routes/route-controller.constants";
import { ROUTE_COMMON_FEATURES } from "@/shared/constants/routes/route-feature.constants";
import { revalidatePath } from "next/cache";

const URL = ROUTE_CONTROLLERS.VOUCHERS;

export async function create(payload: IVoucher){
    const res = await api({
        url: `${URL}/${ROUTE_COMMON_FEATURES.CREATE}`,
        method: CONST_METHODS.POST,
        body: payload,
    })
    revalidatePath('/')
    return res
}

export async function findMulti(){
    const res = await api<IVoucher[]>({
        url: `${URL}/${ROUTE_COMMON_FEATURES.FIND_MULTI}`,
        method: CONST_METHODS.GET,
    })
    return res;
}