import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Character } from "./character.entity";
import { CharacterService } from "./character.service";

@ApiTags("character")
@Controller("/character")
export class CharacterController {
	constructor(private readonly characterService: CharacterService) { }

	@Get()
	async getCharacters(): Promise<Character[]> {
		return this.characterService.findAllCharacters();
	};

	@Get(":id")
	async getCharacter(@Param("id") id: Character["id"]): Promise<Character> {
		return this.characterService.findOneCharacter(id);
	}

	@Post()
	async postCharacter(@Body() request: Character): Promise<Character> {
		return this.characterService.createCharacter(request);
	}

	@Put()
	async putCharacter(@Body() request: Character): Promise<Character> {
		return this.characterService.updateCharacter(request);
	}

	@Delete(":id")
	async deleteOneCharacter(@Param("id") id: Character["id"]): Promise<Character> {
		return this.characterService.removeOneCharacter(id);
	}

	@Delete()
	async deleteAllCharacters(): Promise<Character[]> {
		return this.characterService.removeAllCharacters();
	}
}
