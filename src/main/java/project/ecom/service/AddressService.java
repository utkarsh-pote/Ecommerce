package project.ecom.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.ecom.entity.Address;
import project.ecom.repository.AddressRepository;

@Service
public class AddressService {
    @Autowired
    AddressRepository addressRepository;

    public List<Address> getAllAddresses()
    {
        List<Address> address = new ArrayList<Address>();
        addressRepository.findAll().forEach(addressData -> address.add(addressData));
        return address;
    }

    public Address getAddressByAddressId(Long id)
    {
        return addressRepository.findById(id).get();
    }

    public Address saveorUpdateAddress(Address address)
    {
        return addressRepository.save(address);
    }

//	public void deleteAddressById(Long id)
//	{
//		addressRepository.deleteById(id);
//	}

//	public void update(Address address, Long id)
//	{
//		Optional<Address> addressOptional = addressRepository.findById(id);
//		if(addressOptional.isPresent())
//		{
//			addressRepository.save(address);
//		}
//		else {
//			System.out.println("No such " + id + " is present in Address Table!");
//		}
//	}
}

