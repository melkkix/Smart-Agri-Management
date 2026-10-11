package com.smartagri.controller;

import com.smartagri.entity.Product;
import com.smartagri.service.ProductService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    @Autowired
    private ProductService productService;


    // =========================================
    // ADD PRODUCT
    // =========================================

    @PostMapping
    public Product addProduct(
            @RequestBody Product product) {

        return productService.saveProduct(product);
    }


    // =========================================
    // GET PRODUCTS
    // =========================================

    @GetMapping
    public List<Product> getAllProducts(
            @RequestParam(required = false) Long farmerId) {

        // If farmerId is provided,
        // return only that farmer's products

        if (farmerId != null) {

            return productService
                    .getProductsByFarmerId(farmerId);
        }


        // Otherwise return all products
        // Used by Buyer/Admin

        return productService.getAllProducts();
    }


    // =========================================
    // GET PRODUCT BY ID
    // =========================================

    @GetMapping("/{id}")
    public Product getProduct(
            @PathVariable Long id) {

        return productService
                .getProductById(id);
    }


    // =========================================
    // UPDATE PRODUCT
    // =========================================

    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody Product product) {

        return productService
                .updateProduct(id, product);
    }


    // =========================================
    // DELETE PRODUCT
    // =========================================

    @DeleteMapping("/{id}")
    public String deleteProduct(
            @PathVariable Long id) {

        productService.deleteProduct(id);

        return "Product Deleted Successfully";
    }
}