package project.ecom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import project.ecom.entity.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long>{

    List<Order> findByUserId(Long id);

}
