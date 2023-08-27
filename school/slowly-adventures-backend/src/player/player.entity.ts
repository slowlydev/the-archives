import { Character } from "src/character/character.entity";
import { Clothing } from "src/clothing/clothing.entity";
import { PlayerHome } from "src/playerHomes/playerHomes.entity";
import { PlayerItem } from "src/playerItems/playerItems.entity";
import { Weapon } from "src/weapon/weapon.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("player")
export class Player {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nickname: string;

    @ManyToOne(() => Character, (character) => character.players)
    @JoinColumn({ name: "characterID" })
    character: Character;

    @ManyToOne(() => Weapon, (weapon) => weapon.players)
    @JoinColumn({ name: "weaponID" })
    weapon: Weapon;

    @ManyToOne(() => Clothing, (clothing) => clothing.players)
    @JoinColumn({ name: "clothingID" })
    clothing: Clothing;

    @OneToMany(() => PlayerHome, (playerHome) => playerHome.player)
    @JoinColumn({ name: "playerHomeIDS" })
    playerHomes: PlayerHome[];

    @OneToMany(() => PlayerItem, (playerItem) => playerItem.player)
    @JoinColumn({ name: "playerItemIDS" })
    playerItems: PlayerItem[];
}