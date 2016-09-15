package ch.ti8m.paybox.service;

import ch.ti8m.paybox.BCrypter;
import ch.ti8m.paybox.JSONWebToken;
import ch.ti8m.paybox.entity.customer.Customer;
import ch.ti8m.paybox.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.validation.ConstraintViolationException;
import java.util.List;
import java.util.logging.Logger;

/**
 * Created by hof on 11.05.2016.
 */
@Service
public class CustomerService {

    BCrypter bCrypt = new BCrypter();
    JSONWebToken jwt = new JSONWebToken();

    @Autowired
    CustomerRepository customerRepository;

    // Method to delete the token of a user if he is logging out
    public void logoutCustomer(String token) throws Exception {
        // get customer with specific token
        List<Customer> customers = customerRepository.findByJwt(token);
        // check if customer exist
        if (customers.isEmpty()) {
            throw new Exception("User " + customers.get(0).getEmail() + " is already logged out!");
        }

        Customer customer = customers.get(0);
        // delete token from customer
        customer.setJwt(null);
        // update customer
        customerRepository.save(customer);

    }

    // Method to find customer by jwt
    public Customer getCustomerByJwt(String token) throws Exception {
        // get customer with specific token
        List<Customer> customers = customerRepository.findByJwt(token);
        // check if customer exist
        if (customers.isEmpty()) {
            throw new Exception("Token does not exists!");
        }
        // check if token is not expired and valid
        if (jwt.verifyJwt(token, customers.get(0).getEmail()).equals("expired")) {
            logoutCustomer(token);
            throw new Exception("Token expired!");
        }
        // check if token was generated from us
        if (jwt.verifyJwt(token, customers.get(0).getEmail()).equals("mistrustfully")) {
            throw new Exception("Token is mistrustfully");
        }

        //customers.get(0).setPassword(null);

        // return found and validated customer
        return customers.get(0);
    }

    // Method to get user by email and password
    public Customer login(String email, String password) throws Exception {
        // get user with specific email
        List<Customer> customers = customerRepository.findByEmail(email);
        // check if a customer was founded and if given pw is the same
        if (customers.isEmpty() || !bCrypt.checkPassword(password, customers.get(0).getPassword())) {
            throw new Exception("E-Mail or password is not correct");
        }
        // check if customer has a token
        if (customers.get(0).getJwt() != null) {
            throw new Exception("User " + email + " is already logged in!");
        }

        Customer customer = customers.get(0);
        // Generate a new token with id and email which last about 30 min
        String generatedJwt = jwt.createJwt(customer.getId().toString(), customer.getEmail(), 1800000L);
        // Give selected user the new generated token
        customer.setJwt(generatedJwt);
        // update customer with set token
        customerRepository.save(customer);
        // change hashed pw to non hashed pw
        customer.setPassword(password);
        // return customer with non hashed pw
        return customer;
    }


    // Method to find customer by id
    public Customer getCustomer(Long customerId) throws Exception {
        // get customer with specific id
        Customer customer = customerRepository.findOne(customerId);
        // check if a customer was founded
        if (customer == null) {
            throw new Exception("User does not exists!");
        }

        //customer.setPassword(null);

        // return found customer
        return customer;
    }


    // Method to check values of first register step
    public void registerCheck(Customer customer) throws Exception {
        // get all customers with specific email
        List<Customer> customersEmail = customerRepository.findByEmail(customer.getEmail());
        // get all customers with specific phonenumber
        List<Customer> customersPhone = customerRepository.findByPhoneNumber(customer.getPhoneNumber());
        // get all customers with specific email AND phonenumber
        List<Customer> customers = customerRepository.findByPhoneNumberAndEmail(customer.getPhoneNumber(), customer.getEmail());
        // check if a customer with same email/phonenumber exist
        if (!customersEmail.isEmpty() || !customersPhone.isEmpty() || !customers.isEmpty()) {
            throw new Exception("E-Mail and/or phonenumber are already used!");
        }

    }

    // Method to register a new customer
    public Customer register(Customer customer) throws Exception {
        try{
            // backup current pw
            String pw = customer.getPassword();
            // hash pw
            customer.setPassword(bCrypt.bCryptPw(customer.getPassword()));
            // save customer with hashed pw
            customerRepository.save(customer);
            // set customer pw to not hashed pw
            customer.setPassword(pw);
            // return customer with not hashed pw
            return customer;
        } catch(ConstraintViolationException e){
            throw new Exception("Email is not valid!");
        }
    }

    // Method to update a customer
    public void updateCustomer(Customer customer) throws Exception{

        // find customer with id
        Customer customers = customerRepository.findOne(customer.getId());

        // check if customer exist
        if(customers == null){
            throw new Exception("Customers does not exist!");
        }

        // check if email and/or password is not null
        if(customer.getEmail() == null || customer.getPassword() == null){
            throw new Exception("Email and/or password can not be empty");
        }

        // update customer
        customerRepository.save(customer);

    }

    // Method to delete a customer
    public void deleteCustomer(Customer customer) throws Exception{

        // find customer with id
        Customer customers = customerRepository.findOne(customer.getId());

        // check if customer exist
        if(customers == null){
            throw new Exception("Customers does not exist!");
        }

        // delete customer
        customerRepository.delete(customers);
    }
}
