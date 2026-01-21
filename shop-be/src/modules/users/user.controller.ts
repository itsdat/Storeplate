import { Body, Controller, Patch, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { User } from "./entities/user.entity";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { UserDto } from "./dto/user.dto";

@Controller('user')
@ApiBearerAuth('access_token')
export class UserController{
    constructor(
        private readonly userService: UserService
    ){}

    @UseGuards(JwtAuthGuard)
    @Patch("update")
    update(@CurrentUser() user: User, @Body() userDto: UserDto){
        return this.userService.update(user.id, userDto)
    }
}