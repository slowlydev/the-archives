import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AbilityService } from "./ability.service"
import { Ability } from "./ability.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("ability")
@Controller("/ability")
export class AbilityController {
	constructor(private readonly abilityService: AbilityService) { }

	@Get()
	async getAbilities(): Promise<Ability[]> {
		return this.abilityService.findAllAbilities()
	}

	@Get(":id")
	async getAbility(@Param("id") id: Ability["id"]): Promise<Ability> {
		return this.abilityService.findOneAbility(id);
	}

	@Post()
	async postAbility(@Body() request: Ability): Promise<Ability> {
		return this.abilityService.createAbility(request);
	}

	@Put()
	async putAbility(@Body() request: Ability): Promise<Ability> {
		return this.abilityService.updateAbility(request);
	}

	@Delete(":id")
	async deleteAbility(@Param("id") id: Ability["id"]): Promise<Ability> {
		return this.abilityService.removeOneAbility(id);
	}

	@Delete()
	async deleteAbilities(): Promise<Ability[]> {
		return this.abilityService.removeAllAbilities();
	}
}
