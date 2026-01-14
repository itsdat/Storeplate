import { IBase } from "../common/base.interface";

export interface IBanner extends IBase {
    title: string;              // Styles Accessories & New Table Lamp
    subtitle?: string;          // Work light, LED, white

    image: string;              // banner image (right side)

    ctaText?: string;           // Shop Now
    ctaLink?: string;           // /products /collections/...

    position?: "left" | "center" | "right"; 

    isActive?: boolean;         // bật / tắt banner
}