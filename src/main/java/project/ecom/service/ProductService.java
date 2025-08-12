package project.ecom.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.ecom.entity.Product;
import project.ecom.entity.User;
import project.ecom.repository.ProductRepository;

@Service
public class ProductService {

    @Autowired
    ProductRepository productRepository;

    public List<Product> getAllProduct(){
        return productRepository.findAll();
    }

    public Product getProductById(Long id){
        Optional<Product> product = productRepository.findById(id);
        if(product.isPresent())
            return product.get();
        return null;
    }

    public void removeProductById(long id) {
        productRepository.deleteById(id);
    }

    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    public List<Product> getAllProductsByCategory(String category){
        return productRepository.findAllByCategory(category);
    }

    public Product updateProductById(Long id, Product product) {
        Product pro = getProductById(id);

        if(pro != null) {
            if(product.getName() != null) pro.setName(product.getName());
            if(product.getPrice() != 0) pro.setPrice(product.getPrice());
            if(product.getDiscount() != 0) pro.setDiscount(product.getDiscount());
            if(product.getGender()  != null) pro.setGender(product.getGender());
            if(product.getQuantity() != 0) pro.setQuantity(product.getQuantity());
            if(product.getColor() != null) pro.setColor(product.getColor());
            if(product.getImageUrl() != null) pro.setImageUrl(product.getImageUrl());
            if(product.getDescription() != null) pro.setDescription(product.getDescription());
            if(product.getCategory() != null) pro.setCategory(product.getCategory());
            if(product.getSubCategory() != null) pro.setSubCategory(product.getSubCategory());

            return productRepository.save(pro);
        }
        return null;
    }

    //-------------------
	/*
	public List<Product> findAllByCategory(String category) {
        List<Product> products = productRepository.findAllByCategory(category);
        if (products.isEmpty()) {
            return new ArrayList<>();
        }
        return products;
    }
	*/

    public List<Product> findAllByCategory(String category) {
        List<Product> products = productRepository.findAllByCategory(category);
        return products.isEmpty() ? new ArrayList<>() : products;
    }

    public List<Product> findAllBySubCategory(String subCategory) {
        List<Product> products = productRepository.findAllBySubCategory(subCategory);
        return products.isEmpty() ? new ArrayList<>() : products;
    }

    public List<Product> findAllByColor(String color) {
        List<Product> products = productRepository.findAllByColor(color);
        return products.isEmpty() ? new ArrayList<>() : products;
    }

    public List<Product> findAllByGender(String gender) {
        List<Product> products = productRepository.findAllByGender(gender);
        return products.isEmpty() ? new ArrayList<>() : products;
    }

    public List<Product> findAllByDiscountGreaterThan(double discount) {
        List<Product> products = productRepository.findAllByDiscountGreaterThan(discount);
        return products.isEmpty() ? new ArrayList<>() : products;
    }

}
