import { PrismaClient } from "@prisma/client";


let prisma: PrismaClient;

function getPrisma() {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}

// export const getProductsListAction = async () => {
//     const products = await getPrisma().product.findMany()
//     return products
// }

export const getProductsListAction = async () => {
  try {
    const products = await getPrisma().product.findMany();

    console.log(products);

    return products;
  } catch (err) {
    console.error(err);
    return [];
  }
}

