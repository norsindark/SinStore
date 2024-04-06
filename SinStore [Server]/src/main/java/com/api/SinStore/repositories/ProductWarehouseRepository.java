package com.api.SinStore.repositories;

import com.api.SinStore.entities.Product;
import com.api.SinStore.entities.ProductWarehouse;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductWarehouseRepository extends JpaRepository<ProductWarehouse, String> {

    ProductWarehouse findByProductId(Product product);
}
