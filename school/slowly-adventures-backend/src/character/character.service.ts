import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Character } from "./character.entity";

@Injectable()
export class CharacterService {
	constructor(
		@InjectRepository(Character)
		private readonly characterRepository: Repository<Character>
	) { }

	async findAllCharacters(): Promise<Character[]> {
		return this.characterRepository.find({ relations: ["ability"] });
	}

	async findOneCharacter(id: Character["id"]): Promise<Character> {
		const character = await this.characterRepository.findOne(id);

		if (!character) {
			throw new BadRequestException()
		}

		return character;
	}

	async createCharacter(request: Character): Promise<Character> {
		return this.characterRepository.save(request);
	}

	async updateCharacter(request: Character): Promise<Character> {
		return this.characterRepository.save(request);
	}

	async removeOneCharacter(id: Character["id"]): Promise<Character> {
		const character = await this.characterRepository.findOne(id);


		if (!character) {
			throw new BadRequestException();
		}

		await this.characterRepository.delete(id);

		return character;
	}

	async removeAllCharacters(): Promise<Character[]> {
		const characters = await this.characterRepository.find();
		const ids = characters.map(c => c.id);

		await this.characterRepository.delete(ids);

		return characters;
	}
}
