package project.ecom.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import project.ecom.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long>{

    Optional<User> findByEmailIgnoreCaseAndPassword(String email, String password);

    // Find user by email (for profile page)
    Optional<User> findByEmail(String email);
}
