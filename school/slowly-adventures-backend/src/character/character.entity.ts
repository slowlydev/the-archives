import { Ability } from "src/ability/ability.entity";
import { Player } from "src/player/player.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("character")
export class Character {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	speed: number;

	@Column()
	strength: number;

	@Column()
	stamina: number;

	@ManyToOne(() => Ability, (ability) => ability.characters)
	@JoinColumn({ name: "abilityID" })
	ability: Ability;

	@OneToMany(() => Player, (player) => player.character)
	@JoinColumn({ name: "player" })
	players: Player[];
}
