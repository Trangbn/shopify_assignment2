import { UserInfo } from './../../common/user-info';
import { AuthUser } from './../../decorators/auth.user.decorator';
import { Cart } from './carts.entity';
import { CartService } from './carts.service';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiBody } from '@nestjs/swagger';
import { CreateCartDto } from './dto/cart-request.dto';

@Controller('carts')
@ApiTags('Cart')
@ApiBearerAuth()
export class CartController {
  constructor(private readonly cartService: CartService) { }

  @Post()
  @ApiBody({ type: CreateCartDto })
  async createOrUpdateCart(
    @Body() body: CreateCartDto,
    @AuthUser() authUser: UserInfo,
  ): Promise<Cart> {
    if(!body.cart_info.items.length && body.id) {
      await this.cartService.delete(body.id);
      return null;
    }
    return this.cartService.store({ ...body, user_id: authUser.id } as Cart);
  }

  @Get()
  async getCart(
    @AuthUser() authUser: UserInfo,
  ): Promise<Cart> {
    return this.cartService.findOne({ user_id: authUser.id });
  }
}
