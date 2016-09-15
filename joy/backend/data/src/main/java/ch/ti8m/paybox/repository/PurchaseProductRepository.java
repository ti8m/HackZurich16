package ch.ti8m.paybox.repository;

import ch.ti8m.paybox.entity.purchase.PurchaseProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Fatih on 30.05.16.
 */
@Repository
public interface PurchaseProductRepository extends JpaRepository<PurchaseProduct, Long> {
}
