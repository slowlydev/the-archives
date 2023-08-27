import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { WeaponService } from "./weapon.service"
import { Weapon } from "./weapon.entity";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("weapon")
@Controller("/weapon")
export class WeaponController {
  constructor(private readonly weaponSerivce: WeaponService) { }

  @Get()
  async getWeapons(): Promise<Weapon[]> {
    return this.weaponSerivce.findAllWeapons()
  }

  @Get(":id")
  async getWeapon(@Param("id") id: Weapon["id"]): Promise<Weapon> {
    return this.weaponSerivce.findOneWeapon(id);
  }

  @Post()
  async postWeapon(@Body() request: Weapon): Promise<Weapon> {
    return this.weaponSerivce.createWeapon(request);
  }

  @Put()
  async putWeapon(@Body() request: Weapon): Promise<Weapon> {
    return this.weaponSerivce.updateWeapon(request);
  }

  @Delete(":id")
  async deleteWeapon(@Param("id") id: Weapon["id"]): Promise<Weapon> {
    return this.weaponSerivce.removeOneWeapon(id);
  }

  @Delete()
  async deleteWeapons(): Promise<Weapon[]> {
    return this.weaponSerivce.removeAllWeapons();
  }
}
