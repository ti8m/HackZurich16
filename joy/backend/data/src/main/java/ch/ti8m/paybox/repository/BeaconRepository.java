package ch.ti8m.paybox.repository;

import ch.ti8m.paybox.entity.store.Beacon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Created by Fatih on 11.05.16.
 */
@Repository
public interface BeaconRepository extends JpaRepository<Beacon, Long> {

    List<Beacon> findByMajorIdAndMinorId(int majorId, int minorId);

}
