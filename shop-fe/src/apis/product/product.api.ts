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
        url: `${URL}/${ROUTE_COMMON_FEATURES.FIND_ALL}`,
        method: CONST_METHODS.GET,
    })
    return res;
}

export async function findMulti(){
    const res = await api<IProduct[]>({
        url: `${URL}/${ROUTE_COMMON_FEATURES.FIND_MULTI}`,
        method: CONST_METHODS.GET,
    })
    return res;
}

export async function findOneBySlug(slug: string){
    const res = await api<IProduct>({
        url: `${URL}/${ROUTE_COMMON_FEATURES.FIND_ONE_BY_SLUG}/${slug}`,
        method: CONST_METHODS.GET,
    })
    return res;
}

export async function update(id: string, payload: IProduct){
    const res = await api({
        url: `${URL}/${ROUTE_COMMON_FEATURES.UPDATE}/${id}`,
        method: CONST_METHODS.PATCH,
        body: payload
    })
    revalidatePath('/admin')
    return res;
}

export async function remove(id: string){
    const res = await api({
        url: `${URL}/${ROUTE_COMMON_FEATURES.DELETE}/${id}`,
        method: CONST_METHODS.DELETE,
    })
    revalidatePath('/admin')
    return res;
}
