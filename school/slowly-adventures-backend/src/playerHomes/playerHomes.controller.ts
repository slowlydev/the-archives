import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PlayerHomeService } from "./playerHomes.service"
import { PlayerHome } from "./playerHomes.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("player-homes")
@Controller("/player-homes")
export class PlayerHomeController {
	constructor(private readonly playerHomeService: PlayerHomeService) { }

	@Get()
	async getPlayerHomes(): Promise<PlayerHome[]> {
		return this.playerHomeService.findAllPlayerHomes()
	}

	@Get(":id")
	async getPlayerHome(@Param("id") id: PlayerHome["id"]): Promise<PlayerHome> {
		return this.playerHomeService.findOnePlayerHome(id);
	}

	@Post()
	async postPlayerHome(@Body() request: PlayerHome): Promise<PlayerHome> {
		return this.playerHomeService.createPlayerHome(request);

	}
	@Put()
	async putPlayerHome(@Body() request: PlayerHome): Promise<PlayerHome> {
		return this.playerHomeService.updatePlayerHome(request);
	}

	@Delete(":id")
	async deletePlayerHome(@Param("id") id: PlayerHome["id"]): Promise<PlayerHome> {
		return this.playerHomeService.removeOnePlayerHome(id);
	}

	@Delete()
	async deletePlayerHomes(): Promise<PlayerHome[]> {
		return this.playerHomeService.removeAllPlayerHomes();
	}
}
