import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import {Product} from './product.model';
@Injectable()
export class ProductService{
    constructor(private prisma:PrismaService){}
    async getAllProducts(): Promise<Product[]>{
            return this.prisma.product.findMany();
    }
    async getProduct(id:number):Promise<Product | null>{
        return this.prisma.product.findUnique({
            where:{
                id:Number(id)
            }
        });
    }
    async createProduct(data:Product):Promise<Product>{
        const productExists = await this.prisma.product.findFirst({
            where:{
                id:data.id
            }
        });
        if(productExists){
            const contador = productExists.comprados + 1;
            return await this.prisma.product.update({
                where:{
                    id:productExists.id
                },
                data:{comprados:contador}
            });
        }
        return this.prisma.product.create({
            data,
        });
    }
    async updateProduct(id:number,data:Product):Promise<Product>{
        return this.prisma.product.update({
            where:{
                id:Number(id)
            },
            data:{name:data.name,price:data.price,image:data.image}
        });
    }
    async deleteProduct(id:number):Promise<Product>{
        return this.prisma.product.delete({
            where:{
                id:Number(id)
            }
        });
    }
}