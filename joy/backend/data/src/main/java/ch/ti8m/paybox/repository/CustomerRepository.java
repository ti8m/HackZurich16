package ch.ti8m.paybox.repository;

import java.util.List;

import ch.ti8m.paybox.entity.customer.Address;
import ch.ti8m.paybox.entity.customer.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    List<Customer> findByJwt(String jwt);

    List<Customer> findByEmail(String email);

    List<Customer> findByPhoneNumber(String phoneNumber);

    List<Customer> findByPhoneNumberAndEmail(String phoneNumber, String email);
}