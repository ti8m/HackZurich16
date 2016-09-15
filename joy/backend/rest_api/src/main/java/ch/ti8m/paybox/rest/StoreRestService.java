package ch.ti8m.paybox.rest;

import ch.ti8m.paybox.entity.store.Product;
import ch.ti8m.paybox.entity.store.Shop;
import ch.ti8m.paybox.entity.store.ShopProduct;
import ch.ti8m.paybox.entity.store.Store;
import ch.ti8m.paybox.service.StoreService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;


/**
 * Created by Fatih on 11.05.16.
 */
@RestController
@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
public class StoreRestService {

    @Autowired
    StoreService storeService;

    // Method to get specific store
    @RequestMapping(method = RequestMethod.POST, value = "/peanut/api/store/getStore")
    public JSONObject getStore(@RequestBody Store store) throws Exception {
        return storeService.getStore(store);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/peanut/api/store/products/{shopId}")
    public List<ShopProduct> getShopProducts(@PathVariable("shopId") Long shopId) throws Exception {
        return storeService.getShopProducts(shopId);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/peanut/api/store/update")
    public void updateStore(@RequestBody Store store) throws Exception {
        storeService.updateStore(store);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/peanut/api/store/delete")
    public void deleteStore(@RequestBody Store store) throws Exception {
        storeService.deleteStore(store);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/peanut/api/store/shop/update")
    public void updateShop(@RequestBody Shop shop) throws Exception {
        storeService.updateShop(shop);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/peanut/api/store/shop/delete")
    public void deleteStore(@RequestBody Shop shop) throws Exception {
        storeService.deleteShop(shop);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/peanut/api/store/shop/add")
    public void addShop(@RequestBody Shop shop) throws Exception {
        storeService.addShop(shop);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/peanut/api/store/shopProduct/update")
    public void updateShopProduct(@RequestBody ShopProduct shopProduct) throws Exception {
        storeService.updateShopProduct(shopProduct);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/peanut/api/store/shopProduct/delete")
    public void deleteStore(@RequestBody ShopProduct shopProduct) throws Exception {
        storeService.deleteShopProduct(shopProduct);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/peanut/api/store/shopProduct/add")
    public void addShopProduct(@RequestBody ShopProduct shopProduct) throws Exception {
        storeService.addShopProduct(shopProduct);
    }

    @RequestMapping(method = RequestMethod.POST, value = "/peanut/api/store/product/add")
    public void addProduct(@RequestBody Product product) throws Exception {
        storeService.addProduct(product);
    }

}
