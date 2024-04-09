package com.api.SinStore.entities;

import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UuidGenerator;


@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "orders")
public class Order {

    @Id
    @UuidGenerator
    @Column(name = "id", length = 36, nullable = false)
    private String id = UUID.randomUUID().toString();

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    @JsonBackReference
    private User userId;

    @Column(name = "total_price", nullable = true)
    private Double totalPrice;

    @Column(name = "address")
    private String address;

    @Column(name = "country")
    private String country;

    @Column(name = "city")
    private String city;

    @Column(name = "postal_code")
    private String postalCode;

    @Column(name = "phone")
    private String phone;

    @Column(name = "email")
    private String email;

    @Column(name = "notes")
    private String notes;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "status")
    private String status;

    @OneToMany(mappedBy = "orderId", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<OrderItem> orderItems;

    @Column(name = "created_at", nullable = false)
    @CreationTimestamp
    private Timestamp createdAt;

    @Column(name = "updated_at")
    private Timestamp  updatedAt;
}