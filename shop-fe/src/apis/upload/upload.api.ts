"use server"
import { api } from "@/helpers/api.helper";
import { CONST_METHODS } from "@/shared/constants/routes/methods.constants";
import { ROUTE_CONTROLLERS } from "@/shared/constants/routes/route-controller.constants";
import { ROUTE_COMMON_FEATURES } from "@/shared/constants/routes/route-feature.constants";
import { revalidatePath } from "next/cache";
// import { revalidatePath } from "next/cache";

const URL = ROUTE_CONTROLLERS.IMAGES

export async function findMulti(folder: string){
    const res = await api({
        url: `${URL}/${ROUTE_COMMON_FEATURES.GET_MULTI}/${folder}`,
        method: CONST_METHODS.GET,
    })
    return res
}

export async function create(file: File, folderName: string){
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folderName);
    const res = await api({
        url: `${URL}`,
        method: CONST_METHODS.POST,
        body: formData
    })
    // revalidatePath("/collections");
    return res
}

export async function deteleMulti(keys: string[]){
    const res = await api({
        url: `${URL}/${ROUTE_COMMON_FEATURES.DELETE_MULTI}`,
        method: CONST_METHODS.DELETE,
        body: { keys },
    });
    revalidatePath('/admin/*')
    return res
}