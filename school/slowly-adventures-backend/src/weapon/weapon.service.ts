import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Weapon } from "./weapon.entity";

@Injectable()
export class WeaponService {
  constructor(@InjectRepository(Weapon) private readonly weaponRepository: Repository<Weapon>) { }

  async findAllWeapons(): Promise<Weapon[]> {
    return this.weaponRepository.find({ relations: ['rarity'] });
  }

  async findOneWeapon(id: Weapon["id"]): Promise<Weapon> {
    return this.weaponRepository.findOne(id, { relations: ['rarity'] });
  }

  async createWeapon(request: Weapon): Promise<Weapon> {
    return this.weaponRepository.save(request);
  }

  async updateWeapon(request: Weapon): Promise<Weapon> {
    return this.weaponRepository.save(request);
  }

  async removeOneWeapon(id: Weapon["id"]): Promise<Weapon> {
    const rarity = await this.weaponRepository.findOne(id);

    if (!rarity) {
      throw new BadRequestException();
    }

    await this.weaponRepository.delete(id);

    return rarity;
  }

  async removeAllWeapons(): Promise<Weapon[]> {
    const rarities = await this.weaponRepository.find();
    const ids = rarities.map(a => a.id);

    await this.weaponRepository.delete(ids);

    return rarities;
  }
}
