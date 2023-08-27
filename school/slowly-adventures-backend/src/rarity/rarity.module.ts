import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RarityController } from "./rarity.controller";
import { Rarity } from "./rarity.entity";
import { RarityService } from "./rarity.service";

@Module({
  imports: [TypeOrmModule.forFeature([Rarity])],
  providers: [RarityService],
  controllers: [RarityController],
})
export class RarityModule { }
