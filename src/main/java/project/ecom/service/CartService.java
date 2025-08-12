package project.ecom.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.ecom.entity.Cart;
import project.ecom.repository.CartRepository;

@Service
public class CartService {

    @Autowired
    CartRepository cartRepository;

    public Cart addToCart(Cart cartItem) {
        return cartRepository.save(cartItem);
    }

    public Cart getCartById(Long id) {
        Optional<Cart> cart = cartRepository.findById(id);
        if(cart.isPresent())
            return cart.get();
        return null;
    }

    public List<Cart> getall(){
        return cartRepository.findAll();
    }

    public List<Cart> getByUserId(Long id){
        return cartRepository.findByUserId(id);
    }

    public Cart getByCartId(Long id) {
        Optional<Cart> cart = cartRepository.findById(id);
        if(cart.isPresent()) {
            return cart.get();
        }
        return null;
    }
    public Cart getByUserAndProductId(Long userId, Long productId) {
        Optional<Cart> cart = cartRepository.findByUserIdAndProductId(userId, productId);
        if(cart.isPresent()) {
            return cart.get();
        }
        return null;
    }

    public void deleteCart(Long cartId) {
        cartRepository.deleteById(cartId);
    }

    public Cart updateCart(Long userId, Long productId, Cart cartItem) {
        Cart ct = getByUserAndProductId(userId, productId);
        if(ct != null) {
            if (cartItem.getQuantity() != 0) ct.setQuantity(cartItem.getQuantity());
            if (cartItem.getProductId() != 0) ct.setProductId(cartItem.getProductId());
            if (cartItem.getUserId() != 0) ct.setUserId(cartItem.getUserId());
            if (cartItem.getPrice() != 0) ct.setPrice(cartItem.getPrice());
            if (cartItem.getDiscount() != 0) ct.setQuantity(cartItem.getQuantity());

            return cartRepository.save(ct);
        }
        return null;
    }

}
