package ch.ti8m.paybox.entity.customer;


import javax.persistence.*;
import java.io.Serializable;

/**
 * Created by Fatih on 10.05.16.
 */
@Entity
@Table
public class Address implements Serializable {
    private String zip;
    private String street;
    private String city;
    public Customer customer;

    @Column(nullable = false)
//    @Pattern(regexp = "[0-9]*")
    public String getZip() {
        return zip;
    }

    public void setZip(String zip) {
        this.zip = zip;
    }

    @Column(nullable = false)
//    @Pattern(regexp = "[A-Z][a-zA-Z-\\s\\S]*[\\.]?[\\s][0-9]*[a-zA-Z]?$", message = "")
    public String getStreet() {
        return street;
    }

    public void setStreet(String street) {
        this.street = street;
    }

    @Column(nullable = false)
//    @Pattern(regexp = "[A-Z][a-z]*((\\.)?(\\s)(A-Z)(a-z)+)?", message = "")
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    @Id
    @OneToOne(optional = false)
    @JoinColumn(name = "customer_id")
    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}