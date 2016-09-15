package ch.ti8m.paybox.repository;

import ch.ti8m.paybox.entity.store.Beacon;
import ch.ti8m.paybox.entity.store.ShopProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Fatih on 29.06.16.
 */
@Repository
public interface ShopProductRepository extends JpaRepository<ShopProduct, Long> {

}
