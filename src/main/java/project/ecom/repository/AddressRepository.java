package project.ecom.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import project.ecom.entity.Address;

@Repository
public interface AddressRepository extends JpaRepository<Address, Long> {

}
