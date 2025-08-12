package project.ecom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import project.ecom.entity.OrderedItems;

@Repository
public interface OrderedItemsRepository extends JpaRepository<OrderedItems, Long>{

    List<OrderedItems> findByUserId(Long id);

}
