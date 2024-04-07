package com.api.SinStore.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cart_items")
@Builder
public class CartItem {

    @Id
    @UuidGenerator
    @Column(name = "id", length = 36, nullable = false)
    private String id;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "cartId", referencedColumnName = "id")
    @JsonBackReference
    private Cart cartId;

    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name = "productId", referencedColumnName = "id")
    private Product productId;

    private int quantity;
}
