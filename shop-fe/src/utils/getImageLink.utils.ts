export function getImageLink(url: string){
    return `${process.env.NEXT_PUBLIC_BACKEND_IMG_URL}${url}`
}