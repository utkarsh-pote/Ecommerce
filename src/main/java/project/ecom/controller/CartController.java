package project.ecom.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.ecom.entity.Cart;
import project.ecom.entity.User;
import project.ecom.service.CartService;

@CrossOrigin
@RestController
@RequestMapping("/ecom")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/cart")
    public ResponseEntity<Cart> addToCart(@RequestBody Cart cartItem) {
        Cart addedCartItem = cartService.addToCart(cartItem);
        return new ResponseEntity<>(addedCartItem, HttpStatus.CREATED);
    }
    //    @GetMapping("/cart/{cartId}")
//    public ResponseEntity<Cart> getCartById(@PathVariable Long cartId) {
//        Optional<Cart> cartOptional = cartService.getCartById(cartId);
//        return cartOptional.map(ResponseEntity::ok)
//                .orElseGet(() -> ResponseEntity.notFound().build());
//    }
    @GetMapping("/cart/{id}")
    public ResponseEntity<List<Cart>> getByUserId(@PathVariable("id") Long id){
        List<Cart> carts = cartService.getByUserId(id);
        return ResponseEntity.ok(carts);
    }
    @GetMapping("/cart/cart/{id}")
    public ResponseEntity<Cart> getByCartId(@PathVariable("id") Long id){
        Cart cart = cartService.getByCartId(id);
        if(cart != null) {
            return ResponseEntity.ok(cart);
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    }

    @GetMapping("/cart/user/{userId}/{productId}")
    public ResponseEntity<Cart> getByUserProductId(@PathVariable("userId") Long userId,
                                                   @PathVariable("productId") Long productId) {
        Cart cart = cartService.getByUserAndProductId(userId, productId);

        if (cart != null) {
            return ResponseEntity.ok(cart);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @GetMapping("/cart")
    public ResponseEntity<List<Cart>>getAllCarts(){
        List<Cart>carts=cartService.getall();
        return ResponseEntity.ok(carts);
    }
    @DeleteMapping("cart/{cartId}")
    public ResponseEntity<Void> deleteCart(@PathVariable("cartId") Long cartId) {
        cartService.deleteCart(cartId);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("cart/put/{userId}/{productId}")
    public ResponseEntity<Cart> updateCart(@PathVariable("userId") Long userId,
                                           @PathVariable("productId") Long productId, @RequestBody Cart cart) {
        try {
            Cart updatedCart = cartService.updateCart(userId, productId, cart);
            if (updatedCart == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
            }
            return new ResponseEntity<>(updatedCart, HttpStatus.OK); // 200 OK
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // 400 Bad Request
        }
    }
}