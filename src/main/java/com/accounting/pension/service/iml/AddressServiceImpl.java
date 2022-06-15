package com.accounting.pension.service.iml;

import com.accounting.pension.exception.NotFoundException;
import com.accounting.pension.model.AddressEntity;
import com.accounting.pension.model.UserEntity;
import com.accounting.pension.repository.AddressRepository;
import com.accounting.pension.service.AddressService;
import com.accounting.pension.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final UserService userService;

    @Override
    public AddressEntity findById(Long id) {
        return addressRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Address: " + id + " not founded"));
    }

    @Override
    public AddressEntity saveAddress(AddressEntity addressEntity, Long id) {
        UserEntity userEntity = userService.findUserById(id);

        addressEntity.setUserEntity(userEntity);

        return addressRepository.save(addressEntity);

    }

    @Override
    public AddressEntity findByUserId(Long userId) {
        return addressRepository.findByUserEntityId(userId)
            .orElseThrow(() -> new NotFoundException("Address not founded for this user:" + userId));
    }

    @Override
    public AddressEntity updateAddress(AddressEntity addressEntity) {
        AddressEntity addressEntitySecond = findById(addressEntity.getId());

        addressEntity.setUserEntity(addressEntitySecond.getUserEntity());

        return addressRepository.save(addressEntity);
    }
}