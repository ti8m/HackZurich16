package ch.ti8m.paybox.rest;

import ch.ti8m.paybox.entity.customer.Customer;
import ch.ti8m.paybox.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


/**
 * Created by Fatih on 11.05.16.
 */
@RestController
@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
public class CustomerRestService {

    @Autowired
    CustomerService customerService;

    // Method to delete the token of a user if he is logging out
    @RequestMapping(value = "/peanut/api/customer/logout", method = RequestMethod.POST)
    public void logoutCustomer(@RequestBody Customer customer) throws Exception {
        customerService.logoutCustomer(customer.getJwt());
    }

    // Method to check if used token is valid/expired
    @RequestMapping(value = "/peanut/api/customer/byjwt", method = RequestMethod.POST)
    public Customer getCustomerByJwt(@RequestBody Customer customer) throws Exception {
        return customerService.getCustomerByJwt(customer.getJwt());
    }

    // Method to get user by userName and password
    @RequestMapping(value = "/peanut/api/customer/login", method = RequestMethod.GET)
    public Customer login(@RequestParam("email") String email, @RequestParam("password") String password) throws Exception {
        return customerService.login(email, password);
    }

    @RequestMapping(value = "/peanut/api/customer/{customerId}", method = RequestMethod.GET)
    public Customer getCustomer(@PathVariable("customerId") Long customerId) throws Exception {
        return customerService.getCustomer(customerId);
    }

    // Method to register a new customer
    @RequestMapping(method = RequestMethod.POST, path = "/peanut/api/customer/registerCheck")
    public void registerCheck(@RequestBody Customer customer) throws Exception {
        customerService.registerCheck(customer);
    }

    // Method to register a new customer
    @RequestMapping(method = RequestMethod.POST, path = "/peanut/api/customer/register")
    public Customer register(@RequestBody Customer customer) throws Exception {
        return customerService.register(customer);
    }

    // Method to update a customer
    @RequestMapping(method = RequestMethod.PUT, path = "/peanut/api/customer/update")
    public void updateCustomer(@RequestBody Customer customer) throws Exception {
        customerService.updateCustomer(customer);
    }

    // Method to delete a customer
    @RequestMapping(method = RequestMethod.DELETE, path = "/peanut/api/customer/delete")
    public void deleteCustomer(@RequestBody Customer customer) throws Exception {
        customerService.deleteCustomer(customer);
    }
}
