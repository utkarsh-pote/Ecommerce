package project.ecom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import project.ecom.entity.Address;
import project.ecom.service.AddressService;

@CrossOrigin
@RestController
@RequestMapping("/ecom")
public class AddressController {
    @Autowired
    AddressService addressService;

    @GetMapping("/add")
    public List<Address> Addresses()
    {
        return addressService.getAllAddresses();
    }

    @GetMapping("/add/{addressId}")
    public Address getAddressById(@PathVariable("addressId") Long addressId)
    {
        return addressService.getAddressByAddressId(addressId);
    }

    @PostMapping("/add")
    public Address insertAddressData(@RequestBody Address address)
    {
        return addressService.saveorUpdateAddress(address);
    }

//	@PutMapping
//	public void updateAddressData(@RequestBody Address address)
//	{
//		addressService.update(address, address.getAddId());
//	}
}
