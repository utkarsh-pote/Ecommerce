package project.ecom.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import project.ecom.entity.User;
import project.ecom.service.UserService;


@RestController
@CrossOrigin
@RequestMapping("/ecom")
public class UserController {

    @Autowired
    UserService serv;

    @PostMapping("/user")
    public ResponseEntity<User> addUser(@RequestBody User user) {
        try {
            User createdUser = serv.addUser(user);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED); // 201 Created
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // 400 Bad Request
        }
    }

    @GetMapping("/user")
    public ResponseEntity<List<User>> allUsers() {
        List<User> users = serv.allUsers();
        if (users.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
        }
        return new ResponseEntity<>(users, HttpStatus.OK); // 200 OK
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id) {
        User user = serv.getUserById(id);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
        }
        return new ResponseEntity<>(user, HttpStatus.OK); // 200 OK
    }

    @GetMapping("/login")
    public ResponseEntity<User> getByEmailAndPassword(@RequestParam String email, @RequestParam String password) {
        User user = serv.findByEmialAndPassword(email, password);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED); // 401 Unauthorized
        }
        return new ResponseEntity<>(user, HttpStatus.OK); // 200 OK
    }

    @DeleteMapping("/user/{id}")
    public String deleteById(@PathVariable("id") Long id) {
        return serv.deleteById(id);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateById(@PathVariable("id") Long id, @RequestBody User user) {
        try {
            User updatedUser = serv.updateById(id, user);
            if (updatedUser == null) {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND); // 404 Not Found
            }
            return new ResponseEntity<>(updatedUser, HttpStatus.OK); // 200 OK
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST); // 400 Bad Request
        }
    }


}
