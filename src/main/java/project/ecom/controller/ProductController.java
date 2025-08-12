package project.ecom.controller;


import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.util.StreamUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import project.ecom.entity.Product;
import project.ecom.entity.User;
import project.ecom.service.FileService;
import project.ecom.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@CrossOrigin
@RequestMapping("/ecom")
public class ProductController {

    @Autowired
    ProductService productService;

    @Autowired
    FileService fileService;

    @Value("${project.image}")
    String imagePath;

    //get all products
    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts() {
        List<Product> products = productService.getAllProduct();
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
        }
        return new ResponseEntity<>(products, HttpStatus.OK); // 200 OK
    }

    //get single product
    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") long id) {
        Product product = productService.getProductById(id);
        if (product == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
        }
        return new ResponseEntity<>(product, HttpStatus.OK); // 200 OK
    }

    //delete product
    @DeleteMapping("/products/delete/{id}")
    public String deleteProduct(@PathVariable long id) {
        productService.removeProductById(id);
        return "Product deleted";
    }

    //add product
    @PostMapping(value = "/products/add", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Product> addProduct(@RequestPart("product") String productJson,
                                              @RequestPart("image") MultipartFile imageFile) {
        try {

            // Deserialize the JSON string into a Product object
            ObjectMapper objectMapper = new ObjectMapper();
            Product product = objectMapper.readValue(productJson, Product.class);

            // Save the product to get the productId
            Product savedProduct = productService.addProduct(product);

            // Generate the image name based on productId
            String imageName = "image_" + savedProduct.getProductId() + ".jpg";

            // Upload the image
            fileService.uploadImage(imagePath, imageFile, imageName);

            // Set the image URL in the product
            savedProduct.setImageUrl(imageName);

            // Update the product with the image URL
            Product updatedProduct = productService.addProduct(savedProduct);

            return new ResponseEntity<>(updatedProduct, HttpStatus.CREATED); // 201 Created
        } catch (IOException e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // 500 Internal Server Error
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // 400 Bad Request
        }
    }

    @GetMapping("/image/{imageName}")
    public void downLoadImage(@PathVariable("imageName") String name, HttpServletResponse res) throws IOException {
        InputStream is = fileService.getResource(imagePath, name);
        res.setContentType(org.springframework.http.MediaType.IMAGE_JPEG_VALUE);
        StreamUtils.copy(is, res.getOutputStream());
    }

    //update product
    @PutMapping("/products/{id}")
    public ResponseEntity<Product> updateProductById(@PathVariable("id") Long id, @RequestBody Product product) {
        try {
            Product updatedProduct = productService.updateProductById(id, product);
            if (updatedProduct == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
            }
            return new ResponseEntity<>(updatedProduct, HttpStatus.OK); // 200 OK
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // 400 Bad Request
        }
    }
    //------

    @GetMapping("/products/category/{category}")
    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable String category) {
        List<Product> products = productService.findAllByCategory(category);
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
        }
        return new ResponseEntity<>(products, HttpStatus.OK); // 200 OK
    }

    @GetMapping("/products/subcategory/{subCategory}")
    public ResponseEntity<List<Product>> getProductsBySubCategory(@PathVariable String subCategory) {
        List<Product> products = productService.findAllBySubCategory(subCategory);
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
        }
        return new ResponseEntity<>(products, HttpStatus.OK); // 200 OK
    }

    @GetMapping("/products/color/{color}")
    public ResponseEntity<List<Product>> getProductsByColor(@PathVariable String color) {
        List<Product> products = productService.findAllByColor(color);
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
        }
        return new ResponseEntity<>(products, HttpStatus.OK); // 200 OK
    }

    @GetMapping("/products/gender/{gender}")
    public ResponseEntity<List<Product>> getProductsByGender(@PathVariable String gender) {
        List<Product> products = productService.findAllByGender(gender);
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
        }
        return new ResponseEntity<>(products, HttpStatus.OK); // 200 OK
    }

    //not working
    @GetMapping("/products/discount/{discount}")
    public ResponseEntity<List<Product>> getProductsByDiscount(@RequestParam double discount) {
        List<Product> products = productService.findAllByDiscountGreaterThan(discount);
        if (products.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
        }
        return new ResponseEntity<>(products, HttpStatus.OK); // 200 OK
    }

}
