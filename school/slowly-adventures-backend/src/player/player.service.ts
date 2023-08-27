import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Player } from "./player.entity";

@Injectable()
export class PlayerService {
	constructor(@InjectRepository(Player) private readonly playerRepository: Repository<Player>) { }

	async findAllPlayers(): Promise<Player[]> {
		return this.playerRepository.find({ relations: ['character', 'weapon', 'clothing', 'playerHomes', 'playerItems', 'playerHomes.home', 'playerItems.item'] });
	}

	async findOnePlayer(id: Player["id"]): Promise<Player> {
		return this.playerRepository.findOne(id, { relations: ['character', 'weapon', 'clothing', 'playerHomes', 'playerItems', 'playerHomes.home', 'playerItems.item'] })
	}

	async createPlayer(request: Player): Promise<Player> {
		return this.playerRepository.save(request);
	}

	async updatePlayer(request: Player): Promise<Player> {
		return this.playerRepository.save(request);
	}

	async removeOnePlayer(id: Player["id"]): Promise<Player> {
		const player = await this.playerRepository.findOne(id);

		if (!player) {
			throw new BadRequestException();
		}

		await this.playerRepository.delete(id);

		return player;
	}

	async removeAllPlayers(): Promise<Player[]> {
		const players = await this.playerRepository.find();
		const ids = players.map(a => a.id);

		await this.playerRepository.delete(ids);

		return players;
	}
}