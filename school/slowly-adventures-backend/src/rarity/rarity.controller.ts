import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { RarityService } from "./rarity.service"
import { Rarity } from "./rarity.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("rarity")
@Controller("/rarity")
export class RarityController {
  constructor(private readonly rarityService: RarityService) { }

  @Get()
  async getRarities(): Promise<Rarity[]> {
    return this.rarityService.findAllRarities()
  }

  @Get(":id")
  async getRarity(@Param("id") id: Rarity["id"]): Promise<Rarity> {
    return this.rarityService.findOneRarity(id);
  }

  @Post()
  async postRarity(@Body() request: Rarity): Promise<Rarity> {
    return this.rarityService.createRarity(request);
  }

  @Put()
  async putRarity(@Body() request: Rarity): Promise<Rarity> {
    return this.rarityService.updateRarity(request);
  }

  @Delete(":id")
  async deleteRarity(@Param("id") id: Rarity["id"]): Promise<Rarity> {
    return this.rarityService.removeOneRarity(id);
  }

  @Delete()
  async deleteRarities(): Promise<Rarity[]> {
    return this.rarityService.removeAllRarities();
  }
}
