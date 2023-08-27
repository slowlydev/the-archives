import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Item } from "./item.entity";

@Injectable()
export class ItemService {
    constructor(@InjectRepository(Item) private readonly itemRepository: Repository<Item>) { }

    async findAllItems(): Promise<Item[]> {
        return this.itemRepository.find({ relations: ['rarity'] });
    }

    async findOneItem(id: Item["id"]): Promise<Item> {
        return this.itemRepository.findOne(id, { relations: ['rarity'] });
    }

    async createItem(request: Item): Promise<Item> {
        return this.itemRepository.save(request);
    }

    async updateItem(request: Item): Promise<Item> {
        return this.itemRepository.save(request);
    }

    async removeOneItem(id: Item["id"]): Promise<Item> {
        const item = await this.itemRepository.findOne(id);

        if (!item) {
            throw new BadRequestException();
        }

        await this.itemRepository.delete(id);

        return item;
    }

    async removeAllItems(): Promise<Item[]> {
        const items = await this.itemRepository.find();
        const ids = items.map(c => c.id);

        await this.itemRepository.delete(ids);

        return items;
    }
}