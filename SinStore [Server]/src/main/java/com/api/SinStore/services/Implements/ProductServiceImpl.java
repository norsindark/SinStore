package com.api.SinStore.services.Implements;

import com.api.SinStore.entities.Category;
import com.api.SinStore.entities.Product;
import com.api.SinStore.entities.ProductWarehouse;
import com.api.SinStore.entities.Warehouse;
import com.api.SinStore.payloads.requests.ProductRequest;
import com.api.SinStore.payloads.responses.ApiResponse;
import com.api.SinStore.repositories.CategoryRepository;
import com.api.SinStore.repositories.ProductRepository;
import com.api.SinStore.repositories.ProductWarehouseRepository;
import com.api.SinStore.repositories.WarehouseRepository;
import com.api.SinStore.services.Interfaces.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Component
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    private final WarehouseRepository warehouseRepository;

    private final ProductWarehouseRepository productWarehouseRepository;

    private final CategoryRepository categoryRepository;

    @Override
    public List<Product> getAllProducts() {
        return this.productRepository.findAll();
    }

    @Override
    public ApiResponse addNewProduct(ProductRequest product) {
        Optional<Product> newProduct = this.productRepository.findByName(product.getName());
        if (newProduct.isPresent()) {
            return new ApiResponse("Product already exists", HttpStatus.BAD_REQUEST);
        }
        Optional<Warehouse> warehouse = this.warehouseRepository.findByName(product.getWarehouseName());
        if (warehouse.isEmpty()) {
            return new ApiResponse("Warehouse not found", HttpStatus.NOT_FOUND);
        }

        Optional<Category> category = this.categoryRepository.findById(product.getCategoryId());
        if (category.isEmpty()) {
            return new ApiResponse("Category not found", HttpStatus.NOT_FOUND);
        }

        Product _product = Product.builder()
                .name(product.getName())
                .price(product.getPrice())
                .categoryId(category.get().getId())
                .description(product.getDescription())
                .image(product.getImage())
                .build();
        Product saveProduct = this.productRepository.save(_product);

        ProductWarehouse newProductWarehouse = ProductWarehouse.builder()
                .productId(saveProduct)
                .warehouse(warehouse.get())
                .importQuantity(product.getImportQuantity())
                .quantityAvailable(product.getImportQuantity())
                .build();
        _product.setSlug(createSlug(_product.getName()));
        this.productWarehouseRepository.save(newProductWarehouse);
        return new ApiResponse("Product added successfully", HttpStatus.CREATED);
    }

    @Override
    public ApiResponse updateProduct(ProductRequest product, String id) {
        Optional<Product> productData = this.productRepository.findById(id);
        if (productData.isEmpty()) {
            return new ApiResponse("Product not found", HttpStatus.NOT_FOUND);
        }

        Optional<Category> category = this.categoryRepository.findById(product.getCategoryId());
        if (category.isEmpty()) {
            return new ApiResponse("Category not found", HttpStatus.NOT_FOUND);
        }

        Product _product = productData.get();
        _product.setName(product.getName());
        _product.setPrice(product.getPrice());
        _product.setCategoryId(category.get().getId());
        _product.setDescription(product.getDescription());
        _product.setImage(product.getImage());
        _product.setSlug(createSlug(_product.getName()));
        this.productRepository.save(_product);

        ProductWarehouse productWarehouse = this.productWarehouseRepository.findByProductId(_product);
        productWarehouse.setImportQuantity(productWarehouse.getImportQuantity() + product.getImportQuantity());
        productWarehouse.setQuantityAvailable(productWarehouse.getQuantityAvailable() + product.getImportQuantity());
        this.productWarehouseRepository.save(productWarehouse);
        return new ApiResponse("Product updated successfully", HttpStatus.OK);
    }

    @Override
    public ApiResponse deleteProduct(String id) {
        Optional<Product> product = this.productRepository.findById(id);
        if (product.isEmpty()) {
            return new ApiResponse("Product not found", HttpStatus.NOT_FOUND);
        }
        ProductWarehouse productWarehouse = this.productWarehouseRepository.findByProductId(product.get());
        this.productWarehouseRepository.deleteById(productWarehouse.getId());
        this.productRepository.deleteById(id);
        return new ApiResponse("Product deleted successfully", HttpStatus.OK);
    }

    private String createSlug(String name) {
        return name.toLowerCase()
                .replaceAll("\\s", "-")
                .replaceAll("[^a-z0-9-]", "");
    }
}
