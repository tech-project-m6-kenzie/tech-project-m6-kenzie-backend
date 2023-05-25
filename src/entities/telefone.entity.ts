import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./user.entity";
import { Contato } from "./contato.entity";

@Entity('telefones')
class Telefone {
  @PrimaryColumn('uuid')    
  id: string;
  
  @Column()
  phoneNumber: string;

  @ManyToOne(() => User, user => user.telefones)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Contato, contato => contato.telefones)
  @JoinColumn({ name: "contato_id" })
  contato: Contato;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
    numero: any;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Telefone };
