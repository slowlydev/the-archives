import { Character } from "src/character/character.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("ability")
export class Ability {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	staminaCoast: number;

	@Column()
	damage: number;

	@OneToMany(() => Character, (character) => character.ability)
	@JoinColumn({ name: "characterIDS" })
	characters: Character[];
}
