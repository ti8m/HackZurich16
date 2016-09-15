package ch.ti8m.paybox.service;

import ch.ti8m.paybox.entity.store.*;
import ch.ti8m.paybox.repository.*;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.concurrent.atomic.DoubleAccumulator;

/**
 * Created by Fatih on 11.05.16.
 */
@Service
public class StoreService {

    @Autowired
    StoreRepository storeRepository;
    @Autowired
    BeaconRepository beaconRepository;
    @Autowired
    ShopRepository shopRepository;
    @Autowired
    ShopProductRepository shopProductRepository;
    @Autowired
    ProductRepository productRepository;

    // Method to return a store
    // TODO: find better solution as returning a JSONObject
    public JSONObject getStore(Store store) throws Exception {
        // find store with specific uuid
        List<Store> storeList = storeRepository.findByUuid(store.getUuid());
        // check if stores are found
        if(storeList.isEmpty()){
            throw new Exception("UUID is not valid!");
        }

        Beacon beacon = store.getShops().iterator().next().getBeacon();
        // find stores with specific majorId and minorId
        List<Store> stores = storeRepository.findByShopsBeaconMajorIdAndShopsBeaconMinorId(beacon.getMajorId(),
                beacon.getMinorId());
        // check if stores are found
        if(stores.isEmpty()){
            throw new Exception("Store not found!");
        }
        // create a JSONObject with store information's
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id", stores.get(0).getShops().iterator().next().getId());
        jsonObject.put("name", stores.get(0).getShops().iterator().next().getName());
        jsonObject.put("majorId", stores.get(0).getShops().iterator().next().getBeacon().getMajorId());
        jsonObject.put("minorId", stores.get(0).getShops().iterator().next().getBeacon().getMinorId());
        jsonObject.put("image", stores.get(0).getImage());
        jsonObject.put("passengerSeat", stores.get(0).getShops().iterator().next().isPassengerSeat());
        // return JSONObject
        return jsonObject;
    }

    // Method to create and save a store
    public void createStore(Store store){
        storeRepository.save(store);
    }

    // Method to return the products of a store
    public List<ShopProduct> getShopProducts(Long shopId) throws Exception {
        // find a shop with specific id
        Shop shop = shopRepository.findOne(shopId);
        // check if a shop was found
        if(shop == null){
            throw new Exception("Shop with given id does not exists!");
        }
        // generate product list
        List<ShopProduct> shopProducts = new ArrayList<>();
        // iterate over all products
        Iterator<ShopProduct> it = shop.getProducts().iterator();
        while(it.hasNext()){
            // get current product
            ShopProduct s = it.next();
            // generate new ShopProduct and set values
            ShopProduct shopProduct = new ShopProduct();
            shopProduct.setPrice(s.getPrice());
            shopProduct.setId(s.getId());
            shopProduct.setSpecial(s.getSpecial());
            // generate new Product and set values
            Product product = new Product();
            product.setId(s.getProduct().getId());
            product.setName(s.getProduct().getName());
            product.setProductCode(s.getProduct().getProductCode());
            product.setDescription(s.getProduct().getDescription());
            product.setCategory(s.getProduct().getCategory());
            product.setImage(s.getProduct().getImage());
            product.setEan(s.getProduct().getEan());

            shopProduct.setProduct(product);

            shopProducts.add(shopProduct);
        }
        // return product list
        return shopProducts;
    }

    // method to update a store
    public void updateStore(Store store) throws Exception {

        // find store which should be updated
        Store stores = storeRepository.findOne(store.getId());

        // check if store exist
        if (stores == null) {
            throw new Exception("Store not found!");
        }

        // set shops to avoid deleting all shops
        store.setShops(stores.getShops());

        // update store
        storeRepository.save(store);

    }

    // method to update a shop
    public void updateShop(Shop shop) throws Exception {

        // find shop which should be updated
        Shop shops = shopRepository.findOne(shop.getId());

        // check if shop exist
        if(shops == null) {
            throw new Exception("Shop not found!");
        }

        // check if beacon exist
        if(shop.getBeacon() == null){
            throw new Exception("Beacon can not be empty!");
        }

        // set store an products to avoid deleting all stores and products
        shop.setStore(shops.getStore());
        shop.setProducts(shops.getProducts());

        // update shop
        shopRepository.save(shop);
    }

    // method to update a shopProduct
    public void updateShopProduct(ShopProduct shopProduct) throws Exception{

        // find shopProduct which should be updated
        ShopProduct sp = shopProductRepository.findOne(shopProduct.getId());

        // check if shopProduct exist
        if(sp == null) {
            throw new Exception("ShopProduct not found!");
        }

        // check if price is not a number and not negative
        if(Double.isNaN(shopProduct.getPrice()) || shopProduct.getPrice() < 0){
            throw new Exception("Price can not be empty or negative");
        }

        // set shop an products to avoid deleting all shops and products
        shopProduct.setShop(sp.getShop());
        shopProduct.setProduct(sp.getProduct());

        // update shopProduct
        shopProductRepository.save(shopProduct);

    }

    // method to delete a store
    public void deleteStore(Store store) throws Exception{

        // find store with specific id
        Store stores = storeRepository.findOne(store.getId());

        // check if store was found
        if(stores == null){
            throw new Exception("Store not found!");
        }

        // delete store from database
        storeRepository.delete(stores);

    }

    // method to delete a shop
    public void deleteShop(Shop shop)throws Exception{

        // find shop with specific id
        Shop shops = shopRepository.findOne(shop.getId());

        // check if shop was found
        if(shops == null){
            throw new Exception("Shop not found!");
        }

        // find store of shop
        Store stores = storeRepository.findOne(shops.getStore().getId());

        // delete shop from store to remove the relation
        stores.getShops().remove(shops);

        // delete shop from database
        shopRepository.delete(shops);
    }

    // method to delete a shopProduct
    public void deleteShopProduct(ShopProduct shopProduct)throws Exception{

        // find shopProduct with specific id
        ShopProduct shopProducts = shopProductRepository.findOne(shopProduct.getId());

        // check if shopProduct was found
        if(shopProducts == null){
            throw new Exception("ShopProduct not found!");
        }

        // find shop of shopProduct
        Shop shop = shopRepository.findOne(shopProducts.getShop().getId());

        // delete product from shop to remove the relation
        shop.getProducts().remove(shopProducts);

        // delete shopProduct from database
        shopProductRepository.delete(shopProducts);
    }

    // method to add new product
    public void addProduct(Product product){

        productRepository.save(product);

    }

    // method to register a new shop
    public void addShopProduct(ShopProduct shopProduct){

        // find shop from new shop
        Shop shop = shopRepository.findOne(shopProduct.getShop().getId());

        // set found store, new shop to create the relations between them
        shopProduct.setShop(shopRepository.findOne(shopProduct.getShop().getId()));
        shopProduct.setProduct(productRepository.findOne(shopProduct.getProduct().getId()));

        shop.getProducts().add(shopProduct);

        // update shopproducts with new shop
        shopRepository.save(shop);

    }

    // method to register a new shop
    public void addShop(Shop shop){

        // find store from new shop
        Store store = storeRepository.findOne(shop.getStore().getId());

        // set found store, new shop to create the relations between them
        shop.setStore(store);
        shop.getBeacon().setShop(shop);

        store.getShops().add(shop);

        // update store with new shop
        storeRepository.save(store);

    }

}
