import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Item } from "./item.entity";
import { ItemService } from "./item.service";

@ApiTags("item")
@Controller("/item")
export class ItemController {
    constructor(private readonly itemService: ItemService) { }

    @Get()
    async getItems(): Promise<Item[]> {
        return this.itemService.findAllItems();
    }

    @Get(":id")
    async getItem(@Param("id") id: Item["id"]): Promise<Item> {
        return this.itemService.findOneItem(id);
    }

    @Post()
    async postItem(@Body() request: Item): Promise<Item> {
        return this.itemService.createItem(request);
    }

    @Put()
    async putItem(@Body() request: Item): Promise<Item> {
        return this.itemService.updateItem(request);
    }

    @Delete(":id")
    async deleteItem(@Param("id") id: Item["id"]): Promise<Item> {
        return this.itemService.removeOneItem(id);
    }

    @Delete()
    async deleteItems(): Promise<Item[]> {
        return this.itemService.removeAllItems();
    }
}