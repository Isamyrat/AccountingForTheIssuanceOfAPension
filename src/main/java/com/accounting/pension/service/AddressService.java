package com.accounting.pension.service;

import com.accounting.pension.model.AddressEntity;

public interface AddressService {
    AddressEntity findById(Long id);

    AddressEntity saveAddress(AddressEntity addressEntity, Long id);

    AddressEntity findByUserId(Long userId);

    AddressEntity updateAddress(AddressEntity addressEntity);
}
