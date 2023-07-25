import { PageMetaDto } from './../../common/dto/pagination-meta.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from './../../utils/base.service';
import { Injectable } from '@nestjs/common';
import { Cart } from './carts.entity';
import { CartRepository } from './carts.repository';

@Injectable()
export class CartService extends BaseService<Cart> {
  constructor(
    @InjectRepository(Cart)
    public repository: CartRepository,
  ) {
    super(repository);
  }
}
