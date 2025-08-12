package project.ecom.service;

//import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.ecom.entity.Order;
import project.ecom.repository.OrderRepository;

@Service
public class OrderService {
    @Autowired
    OrderRepository orderRepository;

    public List<Order> getAllOrders()
    {
        return orderRepository.findAll();
//		orderRepository.findAll().forEach(ordersData -> orders.add(ordersData));
//		return orders;
    }

    public Order getOrderByOrderId(Long id)
    {
        return orderRepository.findById(id).get();
    }

    public List<Order> getByUserId(Long id){
        return orderRepository.findByUserId(id);
    }

    public Order saveOrUpdateOrder(Order order)
    {
        return orderRepository.save(order);
    }

    public void deleteOrderById(Long id)
    {
        orderRepository.deleteById(id);
    }

    public void update(Order order, Long id)
    {
        Optional<Order> orderOptional = orderRepository.findById(id);
        if(orderOptional.isPresent())
        {
            orderRepository.save(order);
        }
        else {
            System.out.println("No such " + id + " is present in Order Table!");
        }
    }

}
