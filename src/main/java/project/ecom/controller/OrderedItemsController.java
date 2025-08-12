package project.ecom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.ecom.entity.OrderedItems;
import project.ecom.service.OrderedItemsService;

@CrossOrigin
@RestController
@RequestMapping("/ecom")
public class OrderedItemsController {

    @Autowired
    OrderedItemsService serv;

    @GetMapping("/ord")
    public ResponseEntity<List<OrderedItems>> getAllItems() {
        List<OrderedItems> items = serv.getAllOrderedItem();
        if (items.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
        }
        return new ResponseEntity<>(items, HttpStatus.OK); // 200 OK
    }

    @GetMapping("/ord/{userId}")
    public ResponseEntity<List<OrderedItems>> getItemsByUserId(@PathVariable("userId") Long userId) {
        List<OrderedItems> items = serv.getOrderedItemsByUserId(userId);
        if (items.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
        }
        return new ResponseEntity<>(items, HttpStatus.OK); // 200 OK
    }

    @PostMapping("/ord")
    public ResponseEntity<OrderedItems> addOrderedItem(@RequestBody OrderedItems orderedItems) {
        try {
            OrderedItems savedItem = serv.addOrderedItem(orderedItems);
            return new ResponseEntity<>(savedItem, HttpStatus.CREATED); // 201 Created
        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // 400 Bad Request
        }
    }

}