package ch.ti8m.paybox.importer;

import ch.ti8m.paybox.BCrypter;
import ch.ti8m.paybox.entity.customer.Customer;
import ch.ti8m.paybox.repository.CustomerRepository;
import ch.ti8m.paybox.service.CustomerService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * Created by Fatih on 23.05.16.
 */
@Service
public class CustomerImport {

    @Autowired
    CustomerService customerService;

    // Method to import default customer "Joey"
    public void importCustomerJoey() throws Exception {

        Customer customer = new Customer();
        customer.setPassword("12345");
        customer.setEmail("joey@minnis.com");
        customer.setPhoneNumber("0123456789");

        customerService.register(customer);

    }

    // Method to import default customer "Lisa"
    public void importCustomerLisa() throws Exception {

        Customer customer = new Customer();
        customer.setPassword("12345");
        customer.setEmail("lisa@pat.com");
        customer.setPhoneNumber("0987654321");

        customerService.register(customer);

    }


}
