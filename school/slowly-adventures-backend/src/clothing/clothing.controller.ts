import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Clothing } from "./clothing.entity";
import { ClothingService } from "./clothing.service";

@ApiTags("clothing")
@Controller("/clothing")
export class ClothingController {
  constructor(private readonly clothingService: ClothingService) { }

  @Get()
  async getClothings(): Promise<Clothing[]> {
    return this.clothingService.findAllClothings();
  }

  @Get(":id")
  async getClothing(@Param("id") id: Clothing["id"]): Promise<Clothing> {
    return this.clothingService.findOneClothing(id);
  }

  @Post()
  async postClothing(@Body() request: Clothing): Promise<Clothing> {
    return this.clothingService.createClothing(request);
  }

  @Put()
  async putClothing(@Body() request: Clothing): Promise<Clothing> {
    return this.clothingService.updateClothing(request);
  }

  @Delete(":id")
  async deleteClothing(@Param("id") id: Clothing["id"]): Promise<Clothing> {
    return this.clothingService.removeOneClothing(id);
  }

  @Delete()
  async deleteClothings(): Promise<Clothing[]> {
    return this.clothingService.removeAllClothings();
  }
}