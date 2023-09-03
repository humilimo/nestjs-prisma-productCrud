import { ProductService } from "./product.service";
import { Product } from "./product.model";
import { Controller, Get, Post, Body, Param, Delete, Put, Req, Res } from "@nestjs/common";
import { Request, Response } from 'express';
@Controller('product')
export class ProductController{
    constructor(private readonly productService:ProductService){}
    @Get()
    async getAllProducts(@Req() request:Request, @Res() response:Response):Promise<any>{
        const result =  await this.productService.getAllProducts()
        return response.status(200).json({
             status: "Ok!",
             message: "Successfully fetch data!",
             result: result 
        })    
    }
    @Post()
    async postProduct(@Body() postData: Product):Promise<Product>{
        return this.productService.createProduct(postData);
    }
    @Get(':id')
    async getProduct(@Param('id') id:number):Promise<Product | null>{
        return this.productService.getProduct(id);
    }
    @Delete(':id')
    async deleteProduct(@Param('id') id:number):Promise<Product>{
        return this.productService.deleteProduct(id);
    }
    @Put(':id')
    async updateProduct(@Param('id') id:number,@Body() postData:Product):Promise<Product>{
        return this.productService.updateProduct(id,postData);
    }
}