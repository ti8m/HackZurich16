package ch.ti8m.paybox.entity.purchase;

import java.util.Set;

/**
 * Created by Fatih on 26.05.16.
 */
public class PaymentCreditCard {
    private String type;
    private String number;
    private int expire_month;
    private int expire_year;
    private String firstName;
    private String lastName;
    private String intent;
    private String method;
    private String currency;
    private String total;
    private String description;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public int getExpire_month() {
        return expire_month;
    }

    public void setExpire_month(int expire_month) {
        this.expire_month = expire_month;
    }

    public int getExpire_year() {
        return expire_year;
    }

    public void setExpire_year(int expire_year) {
        this.expire_year = expire_year;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getIntent() {
        return intent;
    }

    public void setIntent(String intent) {
        this.intent = intent;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}