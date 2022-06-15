package com.accounting.pension.controller;

import com.accounting.pension.model.AddressEntity;
import com.accounting.pension.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping(AddressController.ADDRESS_URL)
public class AddressController {

    public static final String ADDRESS_URL = "/address";
    private final AddressService addressService;

    @GetMapping("/{id}")
    public ResponseEntity<AddressEntity> getAddressByUserId(@PathVariable Long id) {
        return ResponseEntity.ok(addressService.findByUserId(id));
    }

    @PostMapping("/{id}")
    public AddressEntity createAddress(@RequestBody AddressEntity addressEntity, @PathVariable Long id) {
        return addressService.saveAddress(addressEntity, id);
    }

    @PutMapping
    public ResponseEntity<AddressEntity> updateAddress(@RequestBody AddressEntity addressEntity) {
        return ResponseEntity.ok(addressService.updateAddress(addressEntity));
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<AddressEntity> getAddressById(@PathVariable Long id) {
        return ResponseEntity.ok(addressService.findById(id));
    }
}
