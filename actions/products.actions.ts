import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";


const prisma = new PrismaClient()

export const getProductsListAction = async () => {
    const products = await prisma.product.findMany()
    return products
}

