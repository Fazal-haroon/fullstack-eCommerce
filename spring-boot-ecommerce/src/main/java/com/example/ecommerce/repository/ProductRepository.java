package com.example.ecommerce.repository;

import com.example.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
//@CrossOrigin({"http://localhost:4200", "http://localhost:3000"}) // for multiple
//@CrossOrigin // wildcard (any website)
public interface ProductRepository extends JpaRepository<Product, Long> {
}
