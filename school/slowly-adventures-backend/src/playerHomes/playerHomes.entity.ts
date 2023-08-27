import { Home } from "src/home/home.entity";
import { Player } from "src/player/player.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("playerHome")
export class PlayerHome {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Player, (player) => player.playerHomes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "playerID" })
  player: Player;

  @ManyToOne(() => Home, (home) => home.playerHomes, { onDelete: "CASCADE" })
  @JoinColumn({ name: "homeID" })
  home: Home;
}