package com.api.SinStore.services.Interfaces;

import com.api.SinStore.entities.Warehouse;
import com.api.SinStore.payloads.requests.WarehouseRequest;
import com.api.SinStore.payloads.responses.ApiResponse;

import java.util.List;

public interface WarehouseService {
    List<Warehouse> getAllWarehouses();

    ApiResponse addNewWarehouse(WarehouseRequest request);
}
