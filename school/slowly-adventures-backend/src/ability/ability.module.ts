import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AbilityController } from "./ability.controller";
import { Ability } from "./ability.entity";
import { AbilityService } from "./ability.service";

@Module({
	imports: [TypeOrmModule.forFeature([Ability])],
	providers: [AbilityService],
	controllers: [AbilityController],

})
export class AbilityModule { }
