package project.ecom.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import project.ecom.entity.User;
import project.ecom.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    UserRepository repo;


    //For login
    public User findByEmialAndPassword(String email, String password) {
        Optional<User> user = repo.findByEmailAndPassword(email, password);
        if(user.isPresent())
            return user.get();
        return null;
    }

    //CRUD of users
    public User addUser(User user) {
        return repo.save(user);
    }

    public List<User> allUsers(){
        return repo.findAll();
    }

    public User getUserById(Long id) {
        Optional<User> user = repo.findById(id);
        if(user.isPresent())
            return user.get();
        return null;
    }

    public String deleteById(Long id) {
        repo.deleteById(id);
        return "User Deleted";
    }

    public User updateById(Long id, User user) {
        User us = getUserById(id);
        if(us != null) {
            if (user.getFirstName() != null) us.setFirstName(user.getFirstName());
            if (user.getMiddleName() != null) us.setMiddleName(user.getMiddleName());
            if (user.getLastName() != null) us.setLastName(user.getLastName());
            if (user.getPhone() != null) us.setPhone(user.getPhone());
            if (user.getEmail() != null) us.setEmail(user.getEmail());
            if (user.getPassword() != null) us.setPassword(user.getPassword());
            if (user.getRole() != null) us.setRole(user.getRole());
            if (user.getGender() != null) us.setGender(user.getGender());
            if (user.getCreatedAt() != null) us.setCreatedAt(user.getCreatedAt());

            return repo.save(us);
        }
        return null;
    }

}
