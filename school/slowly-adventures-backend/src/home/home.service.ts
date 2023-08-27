import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Home } from "./home.entity";

@Injectable()
export class HomeService {
	constructor(@InjectRepository(Home) private readonly homeRepository: Repository<Home>) { }

	async findAllHomes(): Promise<Home[]> {
		return this.homeRepository.find();
	}

	async findOneHome(id: Home["id"]): Promise<Home> {
		return this.homeRepository.findOne(id);
	}

	async createHome(request: Home): Promise<Home> {
		return this.homeRepository.save(request);
	}

	async updateHome(request: Home): Promise<Home> {
		return this.homeRepository.save(request);
	}

	async removeOneHome(id: Home["id"]): Promise<Home> {
		const home = await this.homeRepository.findOne(id);

		if (!home) {
			throw new BadRequestException();
		}

		await this.homeRepository.delete(id);

		return home;
	}

	async removeAllHomes(): Promise<Home[]> {
		const homes = await this.homeRepository.find();
		const ids = homes.map(c => c.id);

		await this.homeRepository.delete(ids);

		return homes;
	}
}