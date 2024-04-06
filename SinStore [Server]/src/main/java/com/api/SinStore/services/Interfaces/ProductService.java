package com.api.SinStore.services.Interfaces;

import com.api.SinStore.entities.Product;
import com.api.SinStore.payloads.requests.ProductRequest;
import com.api.SinStore.payloads.responses.ApiResponse;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();

    ApiResponse addNewProduct(ProductRequest product);

    ApiResponse updateProduct(ProductRequest product, String id);

    ApiResponse deleteProduct(String id);

}
