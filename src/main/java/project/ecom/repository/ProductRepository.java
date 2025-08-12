package project.ecom.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import project.ecom.entity.Product;

public interface ProductRepository extends JpaRepository<Product,Long>{

    List<Product> findAllByCategory(String category);
    List<Product> findByProductId(Long id);
    List<Product> findAllByColor(String color);
    List<Product> findAllByGender(String gender);
    List<Product> findAllBySubCategory(String subCategory);

    List<Product> findAllByDiscountGreaterThan(double discount);
}

