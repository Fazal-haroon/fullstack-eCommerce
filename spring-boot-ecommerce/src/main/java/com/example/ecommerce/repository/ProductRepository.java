package com.example.ecommerce.repository;

import com.example.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
//Origin is more than just the hostname, Origin is protocol + hostname + port
//@CrossOrigin({"http://localhost:4200", "http://localhost:3000"})  // for multiple
//@CrossOrigin  // wildcard (any website)
public interface ProductRepository extends JpaRepository<Product, Long> {

    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);
}

    /* //Pagination is useful for handling large amounts of data
    //By default, Spring Data Rest returns: 20elements
    //we can customize this by passing in parameters (page and size)
    //the response metadata has valuable information
    "page": {
        "size": 5, //size of this page
        "totalElements": 100, //Grand total of All elements in the DB. But we are not returning all of the elements. Just the "count" for informational purpose only.
        "totalPages": 20, //total pages available
        "number": 0 //current page number, Remember: Pages are 0-based first page is at position 0 and Second page is at position 1
    }
    */
