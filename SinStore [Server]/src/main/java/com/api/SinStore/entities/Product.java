package com.api.SinStore.entities;

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
@Table(name = "products")
@Builder
public class Product {

    @Id
    @UuidGenerator
    @Column(name = "id", length = 36, nullable = false)
    private String id;

    @Column(name = "name", length = 100, nullable = false)
    private String name;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "description", columnDefinition = "TEXT")
    private String description;

    @JoinColumn(name = "category_id", referencedColumnName = "id")
    private String categoryId;

    @Column(name = "slug")
    private String slug;

    private String image;

    @OneToMany(mappedBy = "productId")
    @JsonManagedReference
    private List<ProductWarehouse> productWarehouses;
}
