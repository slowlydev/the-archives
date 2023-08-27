import { Item } from "src/item/item.entity";
import { Player } from "src/player/player.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("playerItem")
export class PlayerItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Player, (player) => player.playerItems, { onDelete: "CASCADE" })
    @JoinColumn({ name: "playerID" })
    player: Player;

    @ManyToOne(() => Item, (item) => item, { onDelete: "CASCADE" })
    @JoinColumn({ name: "itemID" })
    item: Item;

    @Column()
    amount: number;
}