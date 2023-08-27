import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlayerHomeController } from "./playerHomes.controller";
import { PlayerHome } from "./playerHomes.entity";
import { PlayerHomeService } from "./playerHomes.service";

@Module({
	imports: [TypeOrmModule.forFeature([PlayerHome])],
	providers: [PlayerHomeService],
	controllers: [PlayerHomeController],
})
export class PlayerHomeModule { }