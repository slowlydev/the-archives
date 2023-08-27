import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { PlayerItem } from "./playerItems.entity";

@Injectable()
export class PlayerItemService {
  constructor(@InjectRepository(PlayerItem) private readonly playerItemRepository: Repository<PlayerItem>) { }

  async findAllPlayerItems(): Promise<PlayerItem[]> {
    return this.playerItemRepository.find({ relations: ['item', 'player'] });
  }

  async findOnePlayerItem(id: PlayerItem["id"]): Promise<PlayerItem> {
    return this.playerItemRepository.findOne(id, { relations: ['item', 'player'] });
  }

  async createPlayerItem(request: PlayerItem): Promise<PlayerItem> {
    return this.playerItemRepository.save(request);
  }

  async updatePlayerItem(request: PlayerItem): Promise<PlayerItem> {
    return this.playerItemRepository.save(request);
  }

  async removeOnePlayerItem(id: PlayerItem["id"]): Promise<PlayerItem> {
    const playerItem = await this.playerItemRepository.findOne(id);

    if (!playerItem) {
      throw new BadRequestException();
    }

    await this.playerItemRepository.delete(id);

    return playerItem;
  }

  async removeAllPlayerItems(): Promise<PlayerItem[]> {
    const playerItems = await this.playerItemRepository.find();
    const ids = playerItems.map(a => a.id);

    await this.playerItemRepository.delete(ids);

    return playerItems;
  }
}
