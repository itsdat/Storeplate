"use server";
import { api } from "@/helpers/api.helper";
import { IUser } from "@/interfaces/user/user.interface";
import { CONST_METHODS } from "@/shared/constants/routes/methods.constants";
import { ROUTE_CONTROLLERS } from "@/shared/constants/routes/route-controller.constants";
import { ROUTE_COMMON_FEATURES } from "@/shared/constants/routes/route-feature.constants";
import { revalidatePath } from "next/cache";

const URL = ROUTE_CONTROLLERS.USERS;

export async function update(payload: IUser){
    const res = await api({
        url: `${URL}/${ROUTE_COMMON_FEATURES.UPDATE}`,
        method: CONST_METHODS.PATCH,
        body: payload,
    })
    revalidatePath('/profile')
    return res
}