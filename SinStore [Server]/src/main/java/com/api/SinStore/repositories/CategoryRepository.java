package com.api.SinStore.repositories;

import com.api.SinStore.entities.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, String > {
    Optional<Category> findByName(String name);
}
