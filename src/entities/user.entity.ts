import { Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Telefone } from "./telefone.entity";
import { Contato } from "./contato.entity";
import { Exclude } from "class-transformer";

@Entity('users')
class User {
  @PrimaryColumn('uuid')    
  id: string;
  
  @Column({ length: 200 })
  name: string;

  @Column({ length: 150, unique: true })
  email: string;
  
  @Column({ length: 120 })
  @Exclude()
  password: string;
  
  @Column()
  isAdm: boolean;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Telefone, telefone => telefone.user, { nullable: false,  eager: true  })
  telefones: Telefone[];
  
  @OneToMany(() => Contato, contato => contato.user)
  contatos: Contato[];

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

export { User };



