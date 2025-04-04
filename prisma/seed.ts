import prisma from '@/lib/prisma'

async function main() {

}

main()
  .catch((err) => {
    console.error(err)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
