package project.ecom.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.ecom.entity.OrderedItems;
import project.ecom.repository.OrderedItemsRepository;

@Service
public class OrderedItemsService {

    @Autowired
    OrderedItemsRepository repo;

    public List<OrderedItems> getAllOrderedItem(){
        return repo.findAll();
    }

    public List<OrderedItems> getOrderedItemsByUserId(Long id){
        return repo.findByUserId(id);
    }

    public OrderedItems addOrderedItem(OrderedItems oi) {
        return repo.save(oi);
    }

}
