import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearItemFromCart,
  addItemToCart,
  removeItemFromCart,
} from "../../store/cart/cart.action";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  CheckoutItemContainer,
  ImageContainer,
  RemoveButton,
  Arrow,
} from "./checkout-item.styles";

import { CartItem as TCartItem } from "../../store/cart/cart.types";

type CheckoutItemProp = {
  cartItem: TCartItem;
};

const CheckoutItem: FC<CheckoutItemProp> = ({ cartItem }) => {
  const dispatch = useDispatch();
  const { name, imageUrl, price, quantity } = cartItem;

  const cartItems = useSelector(selectCartItems);

  const clearItemHandler = () =>
    dispatch(clearItemFromCart(cartItems, cartItem));

  const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
  const removeItemHandler = () =>
    dispatch(removeItemFromCart(cartItems, cartItem));

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <span className="name">{name}</span>
      <span className="quantity">
        <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
        <span className="value"> {quantity}</span>
        <Arrow onClick={addItemHandler}>&#10095;</Arrow>
      </span>
      <span className="price">{price}</span>
      <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
};

export default CheckoutItem;
