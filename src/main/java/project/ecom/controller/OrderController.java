package project.ecom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.ecom.entity.Order;
import project.ecom.service.OrderService;

@CrossOrigin
@RestController
@RequestMapping("/ecom")
public class OrderController {
    @Autowired
    OrderService orderService;

    @GetMapping("/order")
    public ResponseEntity<List<Order>> Orders() {
        List<Order> orders = orderService.getAllOrders();
        if (orders.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(orders, HttpStatus.OK);
    }

//	@GetMapping("/order/{orderId}")
//	public Order getOrderDetailsById(@PathVariable("orderId") Long orderId)
//	{
//		return orderService.getOrderByOrderId(orderId);
//	}

    @GetMapping("/order/{id}")
    public ResponseEntity<List<Order>> getByUserId(@PathVariable("id") Long id) {
        List<Order> orders = orderService.getByUserId(id);
        if (orders.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
        }
        return new ResponseEntity<>(orders, HttpStatus.OK); // 200 OK
    }

    @PostMapping("/order")
    public Order insertOrderData(@RequestBody Order order)
    {
        return orderService.saveOrUpdateOrder(order);
    }

//	@PutMapping
//	public void updateOrderData(@RequestBody Order order)
//	{
//		orderService.update(order, order.getOrderId());
//	}
}
