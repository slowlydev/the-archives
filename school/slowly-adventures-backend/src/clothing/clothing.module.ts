import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClothingController } from "./clothing.controller";
import { Clothing } from "./clothing.entity";
import { ClothingService } from "./clothing.service";

@Module({
  imports: [TypeOrmModule.forFeature([Clothing])],
  providers: [ClothingService],
  controllers: [ClothingController],
})
export class ClothingModule { }