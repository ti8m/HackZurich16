package ch.ti8m.paybox.entity.purchase;

import ch.ti8m.paybox.entity.store.Product;
import ch.ti8m.paybox.entity.store.Shop;

/**
 * Created by Fatih on 01.06.16.
 */
public class ShoppingCart {

    private Long id;
    private int amount;
    private Product product;
    private Shop shop;
    private String special;
    private double price;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public int getAmount() {
        return amount;
    }

    public void setAmount(int amount) {
        this.amount = amount;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Shop getShop() {
        return shop;
    }

    public void setShop(Shop shop) {
        this.shop = shop;
    }

    public String getSpecial() {
        return special;
    }

    public void setSpecial(String special) {
        this.special = special;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }
}
