import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Matches } from "class-validator";

export class OrderDto{

    @IsNumber()
    @ApiProperty({ example: 1, description: 'Order ID' })
    orderId: number;
    @IsNumber()
    @ApiProperty({ example: 101, description: 'Product ID' })
    productId: number;
    @IsNumber()
    @ApiProperty({ example: 2, description: 'Quantity of the product ordered' })
    quantity: number;
    @IsNumber()
    @ApiProperty({ example: 199.99, description: 'Total amount for the order' })
    amount: number;
    @ApiProperty({ example: '2024-06-15T10:20:30Z', description: 'Date when the order was placed' })
    @Matches(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/, { message: 'orderDate must be in ISO 8601 format' })
    orderDate: string;

}