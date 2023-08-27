import { Clothing } from "src/clothing/clothing.entity";
import { Item } from "src/item/item.entity";
import { Weapon } from "src/weapon/weapon.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("rarity")
export class Rarity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Item, (item) => item.rarity)
    @JoinColumn({ name: "itemIDS" })
    items: Item[];

    @OneToMany(() => Weapon, (weapon) => weapon.rarity)
    @JoinColumn({ name: "weaponIDS" })
    weapons: Weapon[];

    @OneToMany(() => Clothing, (clothing) => clothing.rarity)
    @JoinColumn({ name: "clothingIDS" })
    clothings: Clothing[];
}