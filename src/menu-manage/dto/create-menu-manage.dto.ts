import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString } from "class-validator";
export class CreateMenuManageDto {
    ///item name
    @ApiProperty({
        example:"Margherita Pizza",
        description:"Add item name here",
        required:true
    })
    @IsString()
    item_name:string
    ///price
    @ApiProperty({
        example:230,
        description:"adding Item Price Here",
        required:true
    })
    @IsInt()
    price:number
    
    ////description
     @ApiProperty({
        example:"Fresh mozarella,tomatoes,basil,and olive oil on our signature crust",
        description:"adding Item description Here",
        required:false
    })
    @IsString()
    description:string

     ////category
     @ApiProperty({
        example:"pizza",
        description:"adding Item category Here",
        required:true
    })
    @IsString()
    category:string

    ////Image_Url
    @ApiProperty({
        example:"http://restaurant/pizza",
        description:"adding Item url Here",
        required:true
    })
    @IsString()
    image_url:string

}


