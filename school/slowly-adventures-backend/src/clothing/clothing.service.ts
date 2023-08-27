import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Clothing } from "./clothing.entity";

@Injectable()
export class ClothingService {
  constructor(@InjectRepository(Clothing) private readonly clothingRepository: Repository<Clothing>) { }

  async findAllClothings(): Promise<Clothing[]> {
    return this.clothingRepository.find({ relations: ['rarity'] });
  }

  async findOneClothing(id: Clothing["id"]): Promise<Clothing> {
    return this.clothingRepository.findOne(id, { relations: ['rarity'] });
  }

  async createClothing(request: Clothing): Promise<Clothing> {
    return this.clothingRepository.save(request);
  }

  async updateClothing(request: Clothing): Promise<Clothing> {
    return this.clothingRepository.save(request);
  }

  async removeOneClothing(id: Clothing["id"]): Promise<Clothing> {
    const clothing = await this.clothingRepository.findOne(id);

    if (!clothing) {
      throw new BadRequestException();
    }

    await this.clothingRepository.delete(id);

    return clothing;
  }

  async removeAllClothings(): Promise<Clothing[]> {
    const clothings = await this.clothingRepository.find();
    const ids = clothings.map(c => c.id);

    await this.clothingRepository.delete(ids);

    return clothings;
  }
}