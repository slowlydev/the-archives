import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PlayerService } from "./player.service"
import { Player } from "./player.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("player")
@Controller("/player")
export class PlayerController {
	constructor(private readonly playerService: PlayerService) { }

	@Get()
	async getPlayers(): Promise<Player[]> {
		return this.playerService.findAllPlayers()
	}

	@Get(":id")
	async getPlayer(@Param("id") id: Player["id"]): Promise<Player> {
		return this.playerService.findOnePlayer(id);
	}

	@Post()
	async postPlayer(@Body() request: Player): Promise<Player> {
		return this.playerService.createPlayer(request);
	}

	@Put()
	async putPlayer(@Body() request: Player): Promise<Player> {
		return this.playerService.updatePlayer(request);
	}

	@Delete(":id")
	async deletePlayer(@Param("id") id: Player["id"]): Promise<Player> {
		return this.playerService.removeOnePlayer(id);
	}

	@Delete()
	async deletePlayers(): Promise<Player[]> {
		return this.playerService.removeAllPlayers();
	}
}
