import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { Telefone } from "./telefone.entity";
import { User } from "./user.entity";

@Entity('contatos')
export class Contato {
  @PrimaryColumn('uuid')    
  id: string;
  
  @Column({ length: 200 })
  name: string;

  @Column({ length: 150, unique: true })
  email: string;
  
  @OneToMany(() => Telefone, telefone => telefone.contato, { nullable: false })
  telefones: Telefone[];

  @ManyToOne(() => User, user => user.contatos)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export default Contato;

