package ch.ti8m.paybox.entity.store;

import javax.persistence.*;

/**
 * Created by Fatih on 10.05.16.
 */
@Entity
@Table
public class Product {
    private long id;
    private String category;
    private String description;
    private String ean;
    private String image;
    private String name;
    private String productCode;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getId() { return id; }

    public void setId(long id) {
        this.id = id;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getEan() {
        return ean;
    }

    public void setEan(String ean) {
        this.ean = ean;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

}
