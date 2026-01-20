"use server";
import { api } from "@/helpers/api.helper";
import { ICart } from "@/interfaces/cart/cart.interface";
import { CONST_METHODS } from "@/shared/constants/routes/methods.constants";
import { ROUTE_CONTROLLERS } from "@/shared/constants/routes/route-controller.constants";
import { ROUTE_COMMON_FEATURES } from "@/shared/constants/routes/route-feature.constants";
import { revalidatePath } from "next/cache";

const URL = ROUTE_CONTROLLERS.CARTS

export async function create(payload: ICart){
    const res = await api({
        url: `${URL}/${ROUTE_COMMON_FEATURES.CREATE}`,
        method: CONST_METHODS.POST,
        body: payload,
    })
    revalidatePath('/')
    return res
}

export async function update(id: string, payload: ICart){
    const res = await api({
        url: `${URL}/${ROUTE_COMMON_FEATURES.UPDATE}/${id}`,
        method: CONST_METHODS.PATCH,
        body: payload,
    })
    revalidatePath('/')
    return res
}

export async function findAll(){
    const res = await api<ICart[]>({
        url: `${URL}/${ROUTE_COMMON_FEATURES.FIND_ALL}`,
        method: CONST_METHODS.GET,
    })
    return res;
}

export async function findOneById(){
    const res = await api<ICart[]>({
        url: `${URL}/${ROUTE_COMMON_FEATURES.FIND_ONE_BY_ID}`,
        method: CONST_METHODS.GET,
    })
    return res;
}

export async function remove(id: string){
    const res = await api({
        url: `${URL}/${ROUTE_COMMON_FEATURES.DELETE}/${id}`,
        method: CONST_METHODS.DELETE,
    })
    revalidatePath('/carts')
    return res;
}