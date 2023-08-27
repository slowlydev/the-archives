import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Home } from "./home.entity";
import { HomeService } from "./home.service";

@ApiTags("home")
@Controller("/home")
export class HomeController {
	constructor(private readonly homeService: HomeService) { }

	@Get()
	async getHomes(): Promise<Home[]> {
		return this.homeService.findAllHomes();
	}

	@Get(":id")
	async getHome(@Param("id") id: Home["id"]): Promise<Home> {
		return this.homeService.findOneHome(id);
	}

	@Post()
	async postHome(@Body() request: Home): Promise<Home> {
		return this.homeService.createHome(request);
	}

	@Put()
	async putHome(@Body() request: Home): Promise<Home> {
		return this.homeService.updateHome(request);
	}

	@Delete(":id")
	async deleteHome(@Param("id") id: Home["id"]): Promise<Home> {
		return this.homeService.removeOneHome(id);
	}

	@Delete()
	async deleteHomes(): Promise<Home[]> {
		return this.homeService.removeAllHomes();
	}
}