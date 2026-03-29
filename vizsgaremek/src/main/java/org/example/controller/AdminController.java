package org.example.controller;

import org.example.model.Customer;
import org.example.model.Orders;
import org.example.model.Product;
import org.example.repository.CustomerRepository;
import org.example.repository.OrderRepository;
import org.example.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;


    @GetMapping("/users")
    public List<Customer> getAllUsers() {
        return customerRepository.findAll();
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody Customer updated) {
        Customer existing = customerRepository.findById(id).orElse(null);
        if (existing == null) return ResponseEntity.notFound().build();
        if (updated.getName() != null) existing.setName(updated.getName());
        if (updated.getEmail() != null) existing.setEmail(updated.getEmail());
        if (updated.getRole() != null) existing.setRole(updated.getRole());
        if (updated.getPhone() != null) existing.setPhone(updated.getPhone());
        customerRepository.save(existing);
        return ResponseEntity.ok("Felhasználó frissítve!");
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Integer id) {
        customerRepository.deleteById(id);
        return ResponseEntity.ok("Felhasználó törölve!");
    }


    @GetMapping("/orders")
    public List<Orders> getAllOrders() {
        return orderRepository.findAll();
    }

    @PutMapping("/orders/{id}/status")
    public ResponseEntity<?> updateOrderStatus(@PathVariable Integer id, @RequestBody String status) {
        Orders order = orderRepository.findById(id).orElse(null);
        if (order == null) return ResponseEntity.notFound().build();
        order.setStatus(status);
        orderRepository.save(order);
        return ResponseEntity.ok("Státusz frissítve!");
    }

    @DeleteMapping("/orders/{id}")
    public ResponseEntity<?> deleteOrder(@PathVariable Integer id) {
        orderRepository.deleteById(id);
        return ResponseEntity.ok("Rendelés törölve!");
    }


    @PostMapping("/products")
    public ResponseEntity<?> addProduct(@RequestBody Product product) {
        try {
            if (product.getDescription() == null) product.setDescription("");
            if (product.getDiscountId() == null) product.setDiscountId(1);
            if (product.getImageUrl() == null) product.setImageUrl("");
            productRepository.save(product);
            return ResponseEntity.ok("Termék hozzáadva!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Hiba: " + e.getMessage());
        }
    }

    @PutMapping("/products/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Integer id, @RequestBody Product updated) {
        Product existing = productRepository.findById(id).orElse(null);
        if (existing == null) return ResponseEntity.notFound().build();
        if (updated.getName() != null) existing.setName(updated.getName());
        if (updated.getDescription() != null) existing.setDescription(updated.getDescription());
        if (updated.getPrice() != null) existing.setPrice(updated.getPrice());
        if (updated.getImageUrl() != null) existing.setImageUrl(updated.getImageUrl());
        if (updated.getCategoryId() != null) existing.setCategoryId(updated.getCategoryId());
        productRepository.save(existing);
        return ResponseEntity.ok("Termék frissítve!");
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable Integer id) {
        productRepository.deleteById(id);
        return ResponseEntity.ok("Termék törölve!");
    }
}