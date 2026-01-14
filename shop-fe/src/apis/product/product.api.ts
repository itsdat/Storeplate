"use server";
import { api } from "@/helpers/api.helper";
import { IProduct } from "@/interfaces/product/product.interface";
import { CONST_METHODS } from "@/shared/constants/routes/methods.constants";
import { ROUTE_CONTROLLERS } from "@/shared/constants/routes/route-controller.constants";
import { ROUTE_COMMON_FEATURES } from "@/shared/constants/routes/route-feature.constants";
import { revalidatePath } from "next/cache";

const URL = ROUTE_CONTROLLERS.PRODUCTS

export async function create(payload: IProduct){
    const res = await api({
        url: `${URL}/${ROUTE_COMMON_FEATURES.CREATE}`,
        method: CONST_METHODS.POST,
        body: payload
    })
    revalidatePath('/admin/*')
    return res
}

export async function findAll(){
    const res = await api({
        url: `${URL}/${ROUTE_COMMON_FEATURES.GET_ALL}`,
        method: CONST_METHODS.GET,
    })
    return res;
}

export async function findMulti(){
    const res = await api({
        url: `${URL}/${ROUTE_COMMON_FEATURES.GET_MULTI}`,
        method: CONST_METHODS.GET,
    })
    return res;
}

export async function findOneBySlug(slug: string){
    const res = await api({
        url: `${URL}/${ROUTE_COMMON_FEATURES.FIND_ONE_BY_SLUG}/${slug}`,
        method: CONST_METHODS.GET,
    })
    return res;
}
