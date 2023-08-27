import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { PlayerItemService } from "./playerItems.service"
import { PlayerItem } from "./playerItems.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("player-items")
@Controller("/player-items")
export class PlayerItemsController {
  constructor(private readonly playerItemService: PlayerItemService) { }

  @Get()
  async getPlayerItems(): Promise<PlayerItem[]> {
    return this.playerItemService.findAllPlayerItems()
  }

  @Get(":id")
  async getPlayerItem(@Param("id") id: PlayerItem["id"]): Promise<PlayerItem> {
    return this.playerItemService.findOnePlayerItem(id);
  }

  @Post()
  async postPlayerItem(@Body() request: PlayerItem): Promise<PlayerItem> {
    return this.playerItemService.createPlayerItem(request);
  }

  @Put()
  async putPlayerItem(@Body() request: PlayerItem): Promise<PlayerItem> {
    return this.playerItemService.updatePlayerItem(request);
  }

  @Delete(":id")
  async deletePlayerItem(@Param("id") id: PlayerItem["id"]): Promise<PlayerItem> {
    return this.playerItemService.removeOnePlayerItem(id);
  }

  @Delete()
  async deletePlayerItems(): Promise<PlayerItem[]> {
    return this.playerItemService.removeAllPlayerItems();
  }
}
