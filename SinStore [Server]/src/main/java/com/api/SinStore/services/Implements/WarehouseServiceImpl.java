package com.api.SinStore.services.Implements;
import com.api.SinStore.entities.Warehouse;
import com.api.SinStore.payloads.requests.WarehouseRequest;
import com.api.SinStore.payloads.responses.ApiResponse;
import com.api.SinStore.repositories.WarehouseRepository;
import com.api.SinStore.services.Interfaces.WarehouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Component
@RequiredArgsConstructor
public class WarehouseServiceImpl implements WarehouseService{

    private final WarehouseRepository warehouseRepository;
    @Override
    public List<Warehouse> getAllWarehouses() {
        return this.warehouseRepository.findAll();
    }

    @Override
    public ApiResponse addNewWarehouse(WarehouseRequest request) {
        Optional<Warehouse> warehouse = this.warehouseRepository.findByName(request.getName());
        if(warehouse.isPresent()){
            return new ApiResponse("Warehouse already exists", HttpStatus.BAD_REQUEST);
        }
        Warehouse _warehouse = new Warehouse();
        _warehouse.setName(request.getName());
        warehouseRepository.save(_warehouse);
        return new ApiResponse( "Warehouse added successfully", HttpStatus.CREATED);
    }
}
