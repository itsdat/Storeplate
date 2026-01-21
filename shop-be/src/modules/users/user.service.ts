import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { IBaseUpdatedRes } from "src/shared/interfaces/common/IBaseRetun.interface";
import { HttpStatusCode } from "src/shared/enums/http-status.enum";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ){}

    async update(id: string, userDto: UserDto): Promise<IBaseUpdatedRes>{
        const user = await this.userRepo.findOne({where: {id}});
        if(!user){
            throw new NotFoundException("User not found")
        }
        try {
            const newData = this.userRepo.merge(user, userDto);
            await this.userRepo.save(newData);
            return{
                message: "User updated successfully",
                statusCode: HttpStatusCode.OK
            }
        } catch (error) {
            throw new Error("Failed to update user");
        }
    }
}