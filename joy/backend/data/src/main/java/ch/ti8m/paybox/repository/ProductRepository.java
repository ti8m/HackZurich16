package ch.ti8m.paybox.repository;

import ch.ti8m.paybox.entity.store.Product;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Created by Fatih on 31.05.16.
 */
public interface ProductRepository extends JpaRepository<Product, Long> {

}
