import { Player } from "src/player/player.entity";
import { Rarity } from "src/rarity/rarity.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("weapon")
export class Weapon {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    damage: number;

    @ManyToOne(() => Rarity, (rarity) => rarity.weapons)
    @JoinColumn({ name: "rarityID" })
    rarity: Rarity;

    @OneToMany(() => Player, (player) => player.weapon)
    @JoinColumn({ name: "playerIDS" })
    players: Player[];
}
