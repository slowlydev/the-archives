import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { HomeController } from "./home.controller";
import { Home } from "./home.entity";
import { HomeService } from "./home.service";

@Module({
	imports: [TypeOrmModule.forFeature([Home])],
	providers: [HomeService],
	controllers: [HomeController]
})
export class HomeModule { }