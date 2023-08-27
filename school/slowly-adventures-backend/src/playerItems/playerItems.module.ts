import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PlayerItemsController } from "./playerItems.controller";
import { PlayerItem } from "./playerItems.entity";
import { PlayerItemService } from "./playerItems.service";

@Module({
  imports: [TypeOrmModule.forFeature([PlayerItem])],
  providers: [PlayerItemService],
  controllers: [PlayerItemsController],
})
export class PlayerItemModule { }
