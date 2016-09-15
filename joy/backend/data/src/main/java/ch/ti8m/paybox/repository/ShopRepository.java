package ch.ti8m.paybox.repository;

import ch.ti8m.paybox.entity.store.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Fatih on 25.05.16.
 */
@Repository
public interface ShopRepository extends JpaRepository<Shop, Long>{

}
