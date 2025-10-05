import { ApiProperty } from "@nestjs/swagger";
import {IsString,IsNotEmpty, MinLength, MaxLength,IsEmail, Length} from "class-validator";

export class LogInDto{
  @ApiProperty({
    example:"exemple1@gmail.com",
    description:"email address used for login"
  })
    @IsEmail()
    @IsNotEmpty()
    email:string

  @ApiProperty({
    example:"12ravP//$d",
    description:"User Password (6 to 20 characters)",
    minLength:6,
    maxLength:20
  })
    @IsString()
    @IsNotEmpty()
    @MinLength(6,{message:"Password must be at least 6 characters long"})
    @MaxLength(20,{message:"Password must not exceed 20 characters "})
    password:string
}
export class SignUpDto extends LogInDto{
  
    @IsString()
    @IsNotEmpty()
    restaurant_name : String
}


export class ResetPasswordDto {
  @ApiProperty({
    example:"exemple1@gmail.com",
    description:"email address used for login"
  })
  @IsEmail()
  email: string;
  @ApiProperty({
    example:"129865",
    description:"OTP for verification user authentication (6 characters)"
  })
  @IsString()
  @Length(6)
  otp: string;
  @ApiProperty({
    example:"12ravP//$d",
    description:"User Password (6 to 20 characters)",
    minLength:6,
    maxLength:20
  })
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  newPassword: string;
}

