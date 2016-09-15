package ch.ti8m.paybox.entity.customer;


import javax.persistence.*;
import javax.validation.constraints.Pattern;

/**
 * Created by Fatih on 10.05.16.
 */
@Entity
@Table
public class Customer {
    private Long id;
    private String email;
    private String password;
    private String jwt;
    private String phoneNumber;
//    private String firstName;
//    private String lastName;
//    private Set<Device> devices;
//    private Set<FavoriteList> favorites;
//    private Set<PaymentMethod> paymentMethods;
    public Address address;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Pattern(regexp = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+(?:[A-Za-z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)*$", message = "Geben sie eine gültige E-Mail Addresse ein")
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Column(nullable = false)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getJwt() { return jwt; }

    public void setJwt(String jwt) { this.jwt = jwt; }

    public String getPhoneNumber() { return phoneNumber; }

    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
/*
    @Column(nullable = false)
//    @Pattern(regexp = "[a-zA-Z]*")
    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    @Column(nullable = false)
//    @Pattern(regexp = "[a-zA-Z]*", message = "Name darf nicht leer sein")
    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    @OneToMany(mappedBy = "customer", fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    public Set<Device> getDevices() {
        return devices;
    }

    public void setDevices(Set<Device> devices) {
        this.devices = devices;
    }

    @OneToMany(mappedBy = "customer", fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    public Set<FavoriteList> getFavorites() {
        return favorites;
    }

    public void setFavorites(Set<FavoriteList> favorites) {
        this.favorites = favorites;
    }

    @OneToMany(mappedBy = "customer", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    public Set<PaymentMethod> getPaymentMethods() {
        return paymentMethods;
    }

    public void setPaymentMethods(Set<PaymentMethod> paymentMethods) {
        this.paymentMethods = paymentMethods;
    }
*/
    @OneToOne(mappedBy = "customer", cascade=CascadeType.ALL)
    public Address getAddress(){ return address; }

    public void setAddress(Address address) { this.address = address; }

}