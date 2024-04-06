package com.api.SinStore.payloads.responses;

import com.api.SinStore.entities.Product;
import com.api.SinStore.entities.ProductWarehouse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductAndWarehouseResponse {


    private Product product;
    private ProductWarehouse productWarehouse;
}
