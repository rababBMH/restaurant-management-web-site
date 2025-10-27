import { ApiProperty } from "@nestjs/swagger";
import { isNumber } from "class-validator";


export class CreateOrderDto {
    @ApiProperty({
            example:5,
            description:"Add table number here",
            required:true
        })
        
        table_number:number
    @ApiProperty({
            example:2500,
            description:"Add total price here",
            required:true
        })
        total_price:number
    @ApiProperty({
        example:[
            {
                menu_item_id:1,
                quantity:2
            },
            {
                menu_item_id:2,
                quantity:1
            }
        ],
        description:"Add order items here",
        required:true
    })
    items: OrderItemDto[];
    }

export class OrderItemDto {
    @ApiProperty({
        example:1,
        description:"Add item id here",
        required:true
    })
    menu_item_id:number

    //  @ApiProperty({
    //     example:1,
    //     description:"Add item id here",
    //     required:true
    // })
    // order_id:number

    @ApiProperty({
        example:2,
        description:"Add quantity here",
        required:true
    })
    quantity:number
}

