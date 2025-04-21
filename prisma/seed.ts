import { connect } from 'http2';
import {
	categories,
	ingredients,
	pizzas,
	products,
	productsVariants,
} from './constants';
import { prisma } from './PrismaClient';
import { hashSync } from 'bcrypt';

async function up() {
	await prisma.user.createMany({
		data: [
			{
				fullName: 'Test',
				email: 'test@gmail.com',
				password: hashSync('11111111', 10),
				verified: new Date(),
				role: 'USER',
			},
			{
				fullName: 'Admin',
				email: 'admin@mail.ru',
				password: hashSync('admin_admin', 10),
				verified: new Date(),
				role: 'ADMIN',
			},
		],
	});

	await prisma.category.createMany({
		data: categories,
	});

	await prisma.ingredient.createMany({
		data: ingredients,
	});

	for (const pizza of pizzas) {
		await prisma.product.create({
			data: pizza,
		});
	}

	await prisma.product.createMany({
		data: products,
	});

	await prisma.productVariant.createMany({
		data: productsVariants,
	});

	await prisma.cart.createMany({
		data: [
			{
				userId: 1,
				totalAmount: 2420,
				token: '12345678',
			},
			{
				userId: 2,
				totalAmount: 0,
				token: '87654321',
			},
		],
	});

	await prisma.cartItem.create({
		data: {
			cartId: 1,
			productVariantId: 1,
			quantity: 2,
			ingredients: {
				connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
			},
		},
	});
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`;
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`;
	await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE;`;
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`;
	await prisma.$executeRaw`TRUNCATE TABLE "ProductVariant" RESTART IDENTITY CASCADE;`;
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`;
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`;
}

async function main() {
	try {
		await down();
		await up();
	} catch (error) {
		console.error(error);
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (error) => {
		console.error(error);
		await prisma.$disconnect();
		process.exit(1);
	});
