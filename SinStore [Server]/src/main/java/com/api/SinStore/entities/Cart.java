package com.api.SinStore.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "carts")
@Builder
public class Cart {

    @Id
    @UuidGenerator
    @Column(name = "id", length = 36, nullable = false)
    private String id;


    @OneToOne
    @JsonBackReference
    @JoinColumn(name = "userId", referencedColumnName = "id")
    private User userId;

    @OneToMany(mappedBy = "cartId")
    @JsonManagedReference
    private List<CartItem> cartItems;


    @Column(name = "total_price", nullable = true)
    private Double totalPrice;

    @PostLoad
    public void updateTotalPrice() {
        this.totalPrice = cartItems.stream()
                .mapToDouble(item -> item.getQuantity() * item.getProductId().getPrice())
                .sum();
    }

    @Column(name = "VAT", nullable = true)
    private Double VAT = 0.1;
}
