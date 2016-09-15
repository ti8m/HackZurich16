package ch.ti8m.paybox.repository;

import ch.ti8m.paybox.entity.store.Shop;
import ch.ti8m.paybox.entity.store.ShopProduct;
import ch.ti8m.paybox.entity.store.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Fatih on 11.05.16.
 */
@Repository
public interface StoreRepository extends JpaRepository<Store, Long> {

    List<Store> findByUuid(String uuid);

    List<Store> findByShopsBeaconMajorIdAndShopsBeaconMinorId(int majorId, int minorId);
}
