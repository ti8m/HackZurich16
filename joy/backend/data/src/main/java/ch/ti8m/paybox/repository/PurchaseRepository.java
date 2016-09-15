package ch.ti8m.paybox.repository;

import ch.ti8m.paybox.entity.purchase.Purchase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Fatih on 30.05.16.
 */
@Repository
public interface PurchaseRepository extends JpaRepository<Purchase, Long> {

    // TODO: method will be used if merchant app is ready
    List<Purchase> findByShopIdAndStatus(Long shopId, int status);

    // TODO: method can be useless if merchant app is ready
    List<Purchase> findByStatus(int status);

    List<Purchase> findByCustomerId(Long customerId);

}
