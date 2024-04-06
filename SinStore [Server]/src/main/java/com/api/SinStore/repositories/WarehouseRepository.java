package com.api.SinStore.repositories;

import com.api.SinStore.entities.Warehouse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WarehouseRepository extends JpaRepository<Warehouse, String > {
    Optional<Warehouse> findByName(String name);
}
