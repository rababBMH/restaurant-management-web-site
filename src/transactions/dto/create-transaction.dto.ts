import { ApiProperty } from "@nestjs/swagger";


export class CreateTransactionDto {
    @ApiProperty({
            example:"income/expense",
            description:"Add type of transaction here",
            required:true
        })
        
        type:string
    @ApiProperty({
            example:5000,
            description:"Add amount here",
            required:true
        })
        amount:number
    @ApiProperty({
        example:"Food Sales/Beverage Sales/Catering/Event/Other",
        description:"Add category here",
        required:true
    })
    category:string    
    @ApiProperty({
        example:"Description about the transaction",
        description:"Add description here",
        required:false
    })
    Description?:string
}
