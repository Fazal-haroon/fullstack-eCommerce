package com.example.ecommerce.dto;

import com.example.ecommerce.dao.Address;
import com.example.ecommerce.dao.Customer;
import com.example.ecommerce.dao.Order;
import com.example.ecommerce.dao.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;
}
