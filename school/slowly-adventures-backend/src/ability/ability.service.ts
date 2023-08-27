import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Ability } from "./ability.entity";

@Injectable()
export class AbilityService {
	constructor(@InjectRepository(Ability) private readonly abilityRepository: Repository<Ability>) { }

	async findAllAbilities(): Promise<Ability[]> {
		return this.abilityRepository.find();
	}

	async findOneAbility(id: Ability["id"]): Promise<Ability> {
		return this.abilityRepository.findOne(id);
	}

	async createAbility(request: Ability): Promise<Ability> {
		return this.abilityRepository.save(request);
	}

	async updateAbility(request: Ability): Promise<Ability> {
		return this.abilityRepository.save(request);
	}

	async removeOneAbility(id: Ability["id"]): Promise<Ability> {
		const ability = await this.abilityRepository.findOne(id);

		if (!ability) {
			throw new BadRequestException();
		}

		await this.abilityRepository.delete(id);

		return ability;
	}

	async removeAllAbilities(): Promise<Ability[]> {
		const abilities = await this.abilityRepository.find();
		const ids = abilities.map(a => a.id);

		await this.abilityRepository.delete(ids);

		return abilities;
	}
}
