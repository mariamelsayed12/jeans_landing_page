import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  await prisma.product.deleteMany();
 await prisma.product.create({
  data: {
    name: {
      en: "Classic Street Jeans",
      ar: "جينز كلاسيك ستريت",
    },

    description: {
      en: "Premium denim jeans with a modern straight fit.",
      ar: "جينز دينم فاخر بقصة مستقيمة عصرية ومريح للاستخدام اليومي.",
    },

    price: 1199,

    sizes: ["S", "M", "L", "XL"],

    variants: [
      {
        color: {
          en: "Blue",
          ar: "أزرق",
        },
        images: [
          "/assets/clothes.png",
          "/assets/clothes2.jpg",
           "/assets/clothes2.jpg",
            "/assets/clothes2.jpg",

        ],
      },
      {
        color: {
          en: "Gray",
          ar: "رمادي",
        },
        images: [
          "/assets/clothes.png",
          "/assets/clothes2.png",
           "/assets/clothes2.png",
            "/assets/clothes2.png",
        ],
      },
    ],
  },
  
});
console.log("Product created");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });