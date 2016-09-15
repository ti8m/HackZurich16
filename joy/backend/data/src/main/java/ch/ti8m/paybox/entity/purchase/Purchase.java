package ch.ti8m.paybox.entity.purchase;

import ch.ti8m.paybox.entity.customer.Customer;
import ch.ti8m.paybox.entity.store.Shop;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Set;

/**
 * Created by Fatih on 10.05.16.
 */
@Entity
@Table
public class Purchase {
    public static final int STATE_CURRENT = 1;
    public static final int STATE_ORDERED = 2;
    public static final int STATE_IN_PROGRESS = 3;
    public static final int STATE_READY = 4;
    public static final int STATE_COMPLETED = 9;
    private Long id;
    private Customer customer;
    private Shop shop;
    private int status;
    private String creationDate;
    private String paymentDate;
    private String paymentDetails;
    private String totalPrice;
    private String orderId;
    private Set<PurchaseProduct> products;
    private PaymentCreditCard paymentCreditCard;
    private ShoppingCart[] shoppingCart;
    private int passengerSeat;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    @ManyToOne
    public Shop getShop() {
        return shop;
    }

    public void setShop(Shop shop) {
        this.shop = shop;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getCreationDate() { return creationDate; }

    public void setCreationDate(String creationDate) { this.creationDate = creationDate; }

    public String getPaymentDate() { return paymentDate; }

    public void setPaymentDate(String paymentDate) { this.paymentDate = paymentDate; }

    public String getPaymentDetails() {
        return paymentDetails;
    }

    public void setPaymentDetails(String paymentDetails) {
        this.paymentDetails = paymentDetails;
    }

    public String getTotalPrice() { return totalPrice; }

    public void setTotalPrice(String totalPrice) { this.totalPrice = totalPrice; }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    @OneToMany(fetch = FetchType.EAGER)
    @JsonManagedReference
    public Set<PurchaseProduct> getProducts() {
        return products;
    }

    public void setProducts(Set<PurchaseProduct> products) {
        this.products = products;
    }

    @Transient
    public PaymentCreditCard getPaymentCreditCard() { return paymentCreditCard; }

    public void setPaymentCreditCard(PaymentCreditCard paymentCreditCard) { this.paymentCreditCard = paymentCreditCard; }

    @Transient
    public ShoppingCart[] getShoppingCart() {
        return shoppingCart;
    }

    public void setShoppingCart(ShoppingCart[] shoppingCart) {
        this.shoppingCart = shoppingCart;
    }

    public int getPassengerSeat() {
        return passengerSeat;
    }

    public void setPassengerSeat(int passengerSeat) {
        this.passengerSeat = passengerSeat;
    }
}

