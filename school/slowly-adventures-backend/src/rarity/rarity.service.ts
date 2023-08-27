import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Rarity } from "./rarity.entity";

@Injectable()
export class RarityService {
  constructor(@InjectRepository(Rarity) private readonly rarityRepository: Repository<Rarity>) { }

  async findAllRarities(): Promise<Rarity[]> {
    return this.rarityRepository.find();
  }

  async findOneRarity(id: Rarity["id"]): Promise<Rarity> {
    return this.rarityRepository.findOne(id);
  }

  async createRarity(request: Rarity): Promise<Rarity> {
    return this.rarityRepository.save(request);
  }

  async updateRarity(request: Rarity): Promise<Rarity> {
    return this.rarityRepository.save(request);
  }

  async removeOneRarity(id: Rarity["id"]): Promise<Rarity> {
    const rarity = await this.rarityRepository.findOne(id);

    if (!rarity) {
      throw new BadRequestException();
    }

    await this.rarityRepository.delete(id);

    return rarity;
  }

  async removeAllRarities(): Promise<Rarity[]> {
    const rarities = await this.rarityRepository.find();
    const ids = rarities.map(a => a.id);

    await this.rarityRepository.delete(ids);

    return rarities;
  }
}
