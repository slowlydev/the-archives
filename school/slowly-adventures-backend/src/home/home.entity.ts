import { PlayerHome } from "src/playerHomes/playerHomes.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("home")
export class Home {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	location: string;

	@Column()
	storage: number;

	@Column()
	price: number;

	@OneToMany(() => PlayerHome, (playerHome) => playerHome)
	@JoinColumn({ name: "playerHomeIDS" })
	playerHomes: PlayerHome[];
}