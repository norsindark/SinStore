package com.api.SinStore.repositories;

import com.api.SinStore.entities.Product;
import com.api.SinStore.entities.ProductWarehouse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface ProductWarehouseRepository extends JpaRepository<ProductWarehouse, String> {

    ProductWarehouse findByProductId(Product product);

    @Query("SELECT pw FROM ProductWarehouse pw WHERE pw.productId = :productId")
    ProductWarehouse findProductWarehouseByProductId(String productId);
}
