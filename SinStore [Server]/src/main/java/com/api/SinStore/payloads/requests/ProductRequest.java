package com.api.SinStore.payloads.requests;

import com.api.SinStore.entities.Category;
import com.api.SinStore.entities.ProductWarehouse;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ProductRequest {
    private String name;

    private String description;

    private double price;

    private String warehouseName;

    private int importQuantity;

    private String categoryId;

    private String image;
}
