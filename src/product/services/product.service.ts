import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";

@Injectable()
export class ProductService {
  constructor(
    @InjectConnection() private readonly connection: Connection,
  ){}
}