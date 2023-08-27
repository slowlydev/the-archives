import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CharacterController } from "./character.controller";
import { Character } from "./character.entity";
import { CharacterService } from "./character.service";

@Module({
	imports: [TypeOrmModule.forFeature([Character])],
	providers: [CharacterService],
	controllers: [CharacterController],
})
export class CharacterModul { }
