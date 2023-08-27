import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PlayerHome } from "./playerHomes.entity";

@Injectable()
export class PlayerHomeService {
	constructor(@InjectRepository(PlayerHome) private readonly playerHomeRepository: Repository<PlayerHome>) { }

	async findAllPlayerHomes(): Promise<PlayerHome[]> {
		return this.playerHomeRepository.find({ relations: ['home', 'player'] });
	}

	async findOnePlayerHome(id: PlayerHome["id"]): Promise<PlayerHome> {
		return this.playerHomeRepository.findOne(id, { relations: ['home', 'player'] })
	}

	async createPlayerHome(request: PlayerHome): Promise<PlayerHome> {
		return this.playerHomeRepository.save(request);
	}

	async updatePlayerHome(request: PlayerHome): Promise<PlayerHome> {
		return this.playerHomeRepository.save(request);
	}

	async removeOnePlayerHome(id: PlayerHome["id"]): Promise<PlayerHome> {
		const playerHome = await this.playerHomeRepository.findOne(id);

		if (!playerHome) {
			throw new BadRequestException();
		}

		await this.playerHomeRepository.delete(id);

		return playerHome;
	}

	async removeAllPlayerHomes(): Promise<PlayerHome[]> {
		const playerHomes = await this.playerHomeRepository.find();
		const ids = playerHomes.map(a => a.id);

		await this.playerHomeRepository.delete(ids);

		return playerHomes;
	}
}