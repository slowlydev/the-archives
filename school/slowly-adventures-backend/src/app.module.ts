import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { getConnectionOptions } from "typeorm";
import { AbilityModule } from "./ability/ability.module";
import { CharacterModul } from "./character/character.module";
import { ClothingModule } from "./clothing/clothing.module";
import { HomeModule } from "./home/home.module";
import { ItemModule } from "./item/item.module";
import { PlayerModule } from "./player/player.module";
import { PlayerHomeModule } from "./playerHomes/playerHomes.module";
import { PlayerItemModule } from "./playerItems/playerItems.module";
import { RarityModule } from "./rarity/rarity.module";
import { WeaponModule } from "./weapon/weapon.module";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () =>
        Object.assign(await getConnectionOptions(), {
          autoLoadEntities: true,
        }),
    }),
    AbilityModule,
    CharacterModul,
    ClothingModule,
    RarityModule,
    WeaponModule,
    ItemModule,
    HomeModule,
    PlayerItemModule,
    PlayerModule,
    PlayerHomeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
