package com.api.SinStore.entities;

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
@Builder
@Table(name = "product_warehouses")
public class ProductWarehouse {
    @Id
    @UuidGenerator
    private String  id;

    @ManyToOne
    @JoinColumn(name = "productId")
    private Product productId;

    @ManyToOne
    @JoinColumn(name = "warehouseId")
    private Warehouse warehouse;

    @Column(name = "quantityAvailable", nullable = true)
    private int quantityAvailable;

    @Column(name = "quantitySold", nullable = true)
    private int quantitySold;

    @Column(name = "importQuantity", nullable = true)
    private int importQuantity;

//    @PostLoad
//    @PostPersist
//    @PostUpdate
//    public void calculateQuantityAvailable() {
//        this.quantityAvailable = this.importQuantity - this.quantitySold;
//    }
}
