import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsUrl, MaxLength, MinLength } from "class-validator";

export class ProfileDto {
////phone number
    @ApiProperty({
        example:"0599999999",
        description:"phone number of the restaurant contains 10 characters(0-9)",
        maxLength:10,
        minLength:10,
        required:true
    })
    @IsString()
    @MaxLength(10)
    @MinLength(10)
    phone_number:string;
///location
    @ApiProperty({
        example:"rue de wiam 212-sidi bel abbes",
        description:"location of the restaurant",
        required:true
    })
    @IsString()
    location:string;
/// facebook url
    @ApiProperty({
        example:"https://www.facebook.com/pizzapalace",
        description:"facebook url for reataurant page",
        required:false
    })
     @IsOptional()
     @IsUrl()
     facebook_url?: string; 

/// instagram url
    @ApiProperty({
        example:"https://www.instagram.com/pizzapalace",
        description:"instagram url for reataurant page",
        required:false
    })
     @IsOptional()
     @IsUrl()
     Instagram_url?: string; 

     /// Tiktok url
    @ApiProperty({
        example:"https://www.tiktok.com/pizzapalace",
        description:"tiktok url for reataurant page",
        required:false
    })
     @IsOptional()
     @IsUrl()
     Tiktok_url?: string; 
    ////Description 
    @ApiProperty({
        example:"welcom to your pretty kitchen",
        description:"restaurant description"
    })
    @IsOptional()
    @IsString()
    Description? : string;

}

export class UpdateProfileDto extends ProfileDto {
    @ApiProperty({
        example:"Gourmet Bistro",
        description:"updated restaurant name",
        required:true
    })
    
    @IsString()
    restaurant_name? : string;
}
