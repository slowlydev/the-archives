import { PlayerItem } from "src/playerItems/playerItems.entity";
import { Rarity } from "src/rarity/rarity.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("item")
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => Rarity, (rarity) => rarity.items)
    @JoinColumn({ name: "rarityID" })
    rarity: Rarity;

    @OneToMany(() => PlayerItem, (playerItem) => playerItem.item)
    @JoinColumn({ name: "playerItemIDS" })
    playerItems: PlayerItem[];
}