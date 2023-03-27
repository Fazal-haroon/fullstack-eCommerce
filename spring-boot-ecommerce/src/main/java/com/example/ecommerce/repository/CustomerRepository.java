package com.example.ecommerce.repository;

import com.example.ecommerce.dao.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Customer findByEmail(String theEmail); // behind the scenes, Spring will execute a query similar to this
    //SELECT * FROM Customer c WHERE c.email = theEmail;
}
