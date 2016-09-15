package ch.ti8m.paybox.entity.store;


import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

/**
 * Created by Fatih on 10.05.16.
 */
@Entity
@Table
public class Shop implements Serializable {
    private Long id;
    private String name;
    private Store store;
    private Beacon beacon;
    private Set<ShopProduct> products;
    private boolean passengerSeat;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @ManyToOne(optional = false)
    @JsonBackReference
    public Store getStore() {
        return store;
    }

    public void setStore(Store store) {
        this.store = store;
    }

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JsonManagedReference
    public Beacon getBeacon() {
        return beacon;
    }

    public void setBeacon(Beacon beacons) {
        this.beacon = beacons;
    }

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    public Set<ShopProduct> getProducts() {
        return products;
    }

    public void setProducts(Set<ShopProduct> products) {
        this.products = products;
    }

    public boolean isPassengerSeat() {
        return passengerSeat;
    }

    public void setPassengerSeat(boolean passengerSeat) {
        this.passengerSeat = passengerSeat;
    }
}
