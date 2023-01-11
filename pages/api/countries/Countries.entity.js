import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Countries {
  @PrimaryGeneratedColumn()
  id;

  @Column({ length: 150 })
  descricao;

  @Column({ length: 2 })
  sigla;
}
