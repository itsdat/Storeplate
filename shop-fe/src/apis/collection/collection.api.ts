"use server";
import { api } from "@/helpers/api.helper";
import { ICollection } from "@/interfaces/collection/collection.interface";
import { CONST_METHODS } from "@/shared/constants/routes/methods.constants";
import { ROUTE_CONTROLLERS } from "@/shared/constants/routes/route-controller.constants";
import { ROUTE_COMMON_FEATURES } from "@/shared/constants/routes/route-feature.constants";
import { revalidatePath } from "next/cache";

const URL = ROUTE_CONTROLLERS.COLLECTIONS

export async function create(payload: ICollection){
    const res = await api({
        url: `${URL}/${ROUTE_COMMON_FEATURES.CREATE}`,
        method: CONST_METHODS.POST,
        body: payload,
        cache: 'reload',
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
        // skipAuth: true
    })
    return res;
}

export async function softDelete(id: string){
    const res = await api({
        url: `${URL}/${ROUTE_COMMON_FEATURES.SOFT_DELETE}/${id}`,
        method: CONST_METHODS.PATCH,
        body: {id}
    })
    revalidatePath('/admin/*')
    return res
}

export async function restore(id: string){
    const res = await api({
        url: `${URL}/${ROUTE_COMMON_FEATURES.RESTORE}/${id}`,
        method: CONST_METHODS.PATCH,
        body: {id}
    })
    revalidatePath('/admin/*')
    return res
}