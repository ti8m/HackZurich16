package ch.ti8m.paybox.importer;

import ch.ti8m.paybox.entity.store.*;
import ch.ti8m.paybox.service.StoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

/**
 * Created by Fatih on 23.05.16.
 */
@Service
public class StoreImport {

    @Autowired
    StoreService storeService;

    public void importThaiStore(){

        // create Store
        Store store = new Store();
        store.setImage("http://thumbs.dreamstime.com/thumblarge_755/7559128.jpg");
        store.setName("Thai-Store");
        store.setUuid("20CB0314-A24F-0815-AFF9-A98FEAA6F01B");

        // create Store
        Shop shop = new Shop();
        shop.setName("Ling-Ding-Yamero");
        shop.setPassengerSeat(false);

        // create Beacon
        Beacon beacon = new Beacon();
        beacon.setMajorId(2015);
        beacon.setMinorId(42145);


        // create ShopProduct
        Set<ShopProduct> shopProducts = new HashSet<ShopProduct>();

        // create Product
        for(int i = 0; i < 4; i++) {
            Product product = new Product();

            ShopProduct shopProduct = new ShopProduct();

            switch (i) {
                case 0:
                    shopProduct.setPrice(7.50);
                    product.setCategory("Essen");
                    product.setDescription("Nudeln mit Süß Sauer Souce und Hänchenbrust");
                    product.setName("Box1");
                    product.setProductCode("TS-B1");
                    product.setEan("7612345678760");
                    product.setImage("http://mettler-consult.ch/i/5424/661-chow-mein-web.gif");
                    break;
                case 1:
                    shopProduct.setPrice(5.99);
                    product.setCategory("Essen");
                    product.setDescription("Frühlingsrolle mit Reis");
                    product.setName("Box2");
                    product.setProductCode("TS-B2");
                    product.setEan("7612345677650");
                    product.setImage("https://thiriet.ch/images/t2-84770.jpg");
                    break;
                case 2:
                    shopProduct.setPrice(2.05);
                    product.setCategory("Getränke");
                    product.setDescription("Koffein- und kohlensäurehaltiges Erfrischungsgetränk");
                    product.setName("Cola");
                    product.setProductCode("TS-G1");
                    product.setEan("7612345676540");
                    product.setImage("http://quill.scene7.com/is/image/Quill/115120_s7?$im120$");
                    break;
                case 3:
                    shopProduct.setPrice(1.00);
                    product.setCategory("Getränke");
                    product.setDescription("Volvic Mineralwasser aus der Volvic-Quelle");
                    product.setName("Volvic");
                    product.setProductCode("TS-G2");
                    product.setEan("7612345675430");
                    product.setImage("http://i01.i.aliimg.com/photo/v0/130867119/Volvic_6_x_1_5lt_pet.jpg_120x120.jpg");
                    break;
            }

            shopProduct.setProduct(product);

            shopProduct.setShop(shop);

            shopProducts.add(shopProduct);
        }

        beacon.setShop(shop);
        shop.setBeacon(beacon);
        shop.setProducts(shopProducts);
        shop.setStore(store);

        Set<Shop> shops = new HashSet<Shop>();

        shops.add(shop);

        store.setShops(shops);

        storeService.createStore(store);

    }

    public void importCoop(){

        // create Store
        Store store = new Store();
        store.setImage("http://wetzikon2016.ch/wp-content/uploads/2014/09/Coop.png");
        store.setName("Coop");
        store.setUuid("20CB0314-A24F-0815-AFF9-A98FEAA6F01B");

        // create Store
        Shop shop = new Shop();
        shop.setName("Coop Bahnhof Wiedikon");
        shop.setPassengerSeat(false);

        // create Beacon
        Beacon beacon = new Beacon();
        beacon.setMajorId(55367);
        beacon.setMinorId(18013);

        // create ShopProduct
        Set<ShopProduct> shopProducts = new HashSet<ShopProduct>();

        // create Product
        for(int i = 0; i < 5; i++) {
            Product product = new Product();

            ShopProduct shopProduct = new ShopProduct();

            switch (i) {
                case 0:
                    shopProduct.setPrice(3.50);
                    product.setCategory("Obst & Gemüse");
                    product.setDescription("5 Bananen aus Brasilien");
                    product.setName("Bananen");
                    product.setProductCode("CO-OG1");
                    product.setEan("7612345671230");
                    product.setImage("https://www.plus.nl/INTERSHOP/static/WFS/PLUS-Site/-/PLUS/nl_NL/product/M/113651.png");
                    break;
                case 1:
                    shopProduct.setPrice(1.99);
                    product.setCategory("Essen");
                    product.setDescription("Baggutte belegt mit Käse, Tomaten, Salat und Salami");
                    product.setName("Belegtes Baguette");
                    product.setProductCode("CO-G1");
                    product.setEan("7612345674560");
                    product.setImage("https://www.pitopia.de/pictures/mosaic/b/boarding1now/92/boarding1now_2312092.jpg");
                    break;
                case 2:
                    shopProduct.setPrice(4.45);
                    product.setCategory("Getränke");
                    product.setDescription("Frisch gepresster Orangensaft mit 100% Fruchtfleisch");
                    product.setName("Orangensaft");
                    product.setProductCode("CO-G1");
                    product.setEan("7612345677890");
                    product.setImage("http://www.mchome.eu/cpmedia/artikel/101_orangensaft_0_25l_t.jpg");
                    break;
                case 3:
                    shopProduct.setPrice(9.55);
                    product.setCategory("Zigaretten");
                    product.setDescription("Ein zu rauchendes Tabakerzeugnis der Marke Malboro");
                    product.setName("Marlboro Zigaretten");
                    product.setProductCode("CO-Z1");
                    product.setEan("7612345679870");
                    product.setImage("http://www.ecigcanadazone.com/shop/product_images/c/619/marlboro-250x250__80699_thumb.jpg");
                    break;
                case 4:
                    shopProduct.setPrice(1.45);
                    product.setCategory("Getränke");
                    product.setDescription("Mittlerer Arabica Kaffee");
                    product.setName("Kaffee");
                    product.setProductCode("CO-G2");
                    product.setEan("7612345675670");
                    product.setImage("http://www.edna.de/WebRoot/EdnaDE/Shops/Edna/Products/52064/52064_s.jpg");
                    break;
            }

            shopProduct.setProduct(product);

            shopProduct.setShop(shop);

            shopProducts.add(shopProduct);
        }

        beacon.setShop(shop);
        shop.setBeacon(beacon);
        shop.setProducts(shopProducts);
        shop.setStore(store);

        Set<Shop> shops = new HashSet<Shop>();

        shops.add(shop);

        store.setShops(shops);

        storeService.createStore(store);

    }

    public void importMcDonalds(){

        // create Store
        Store store = new Store();
        store.setImage("http://www.logoeps.com/wp-content/uploads/2011/04/old-mcdonalds-vector-logo.png");
        store.setName("McDonalds");
        store.setUuid("20CB0314-A24F-0815-AFF9-A98FEAA6F01B");

        // create Store
        Shop shop = new Shop();
        shop.setName("McDonalds Letzigrund");
        shop.setPassengerSeat(false);

        // create Beacon
        Beacon beacon = new Beacon();
        beacon.setMajorId(31410);
        beacon.setMinorId(47903);

        // create ShopProduct
        Set<ShopProduct> shopProducts = new HashSet<ShopProduct>();

        // create Product
        for(int i = 0; i < 4; i++) {
            Product product = new Product();

            ShopProduct shopProduct = new ShopProduct();

            switch (i) {
                case 0:
                    shopProduct.setPrice(8.90);
                    product.setCategory("Essen");
                    product.setDescription("Ein Big Mac mit Pommes und einem Getränk.");
                    product.setName("Big Mac Menü");
                    product.setProductCode("MCD-M1");
                    product.setEan("7612345672340");
                    product.setImage("http://www.skinnytwinkie.com/wp-content/uploads/2013/08/McDonalds_Meal-e1340237983683-120x120.jpg");
                    break;
                case 1:
                    shopProduct.setPrice(2.29);
                    product.setCategory("Essen");
                    product.setDescription("Mit Salat belegte und mit Käse überbackenes Rindfleisch in einem Brötchen.");
                    product.setName("Cheeseburger");
                    product.setProductCode("MCD-B1");
                    product.setEan("7612345673450");
                    product.setImage("http://www.mchome.eu/cpmedia/artikel/1510210027cheeseburger-2.png");
                    break;
                case 2:
                    shopProduct.setPrice(2.99);
                    product.setCategory("Essen");
                    product.setDescription("Panierte und frittierte Stücke aus Hähnchenfleisch.");
                    product.setName("Chicken McNuggets");
                    product.setProductCode("MCD-N1");
                    product.setEan("7612345674560");
                    product.setImage("http://www.mchome.eu/cpmedia/artikel/16042201036_chicken_mcnuggets-14.png");
                    break;
                case 3:
                    shopProduct.setPrice(1.99);
                    product.setCategory("Eis");
                    product.setDescription("Cremiges Softeis mit Oreo Geschmack");
                    product.setName("McFlurry");
                    product.setProductCode("MCD-E1");
                    product.setEan("7612345675670");
                    product.setImage("http://www.mcdonalds.at/sites/default/files/styles/adaptive/adaptive-image/public/cms/preview_0.png?itok=UuBOv_gj");
                    break;
            }

            shopProduct.setProduct(product);

            shopProduct.setShop(shop);

            shopProducts.add(shopProduct);
        }

        beacon.setShop(shop);
        shop.setBeacon(beacon);
        shop.setProducts(shopProducts);
        shop.setStore(store);

        Set<Shop> shops = new HashSet<Shop>();

        shops.add(shop);

        store.setShops(shops);

        storeService.createStore(store);

    }

    public void importSBB() {

        // create Store
        Store store = new Store();
        store.setImage("https://www.wetzikon.ch/SBBLogo.gif");
        store.setName("SBB");
        store.setUuid("20CB0314-A24F-0815-AFF9-A98FEAA6F01B");

        // create Store
        Shop shop = new Shop();
        shop.setName("SBB-Waggon - Zürich-Basel");
        shop.setPassengerSeat(true);

        // create Beacon
        Beacon beacon = new Beacon();
        beacon.setMajorId(53341);
        beacon.setMinorId(11111);

        // create ShopProduct
        Set<ShopProduct> shopProducts = new HashSet<ShopProduct>();

        // create Product
        for (int i = 0; i < 3; i++) {
            Product product = new Product();

            ShopProduct shopProduct = new ShopProduct();

            switch (i) {
                case 0:
                    shopProduct.setPrice(3.99);
                    product.setCategory("Essen");
                    product.setDescription("Baggutte belegt mit Käse, Tomaten, Salat und Salami");
                    product.setName("Belegtes Baguette");
                    product.setProductCode("SBB-G1");
                    product.setEan("0953876208194");
                    product.setImage("https://www.pitopia.de/pictures/mosaic/b/boarding1now/92/boarding1now_2312092.jpg");
                    break;
                case 1:
                    shopProduct.setPrice(1.45);
                    product.setCategory("Getränke");
                    product.setDescription("Frisch gepresster Orangensaft mit 100% Fruchtfleisch");
                    product.setName("Orangensaft");
                    product.setProductCode("SBB-G1");
                    product.setEan("8935648194628");
                    product.setImage("http://www.mchome.eu/cpmedia/artikel/101_orangensaft_0_25l_t.jpg");
                    break;
                case 2:
                    shopProduct.setPrice(1.45);
                    product.setCategory("Getränke");
                    product.setDescription("Mittlerer Arabica Kaffee");
                    product.setName("Kaffee");
                    product.setProductCode("SBB-G2");
                    product.setEan("9182736451928");
                    product.setImage("http://www.edna.de/WebRoot/EdnaDE/Shops/Edna/Products/52064/52064_s.jpg");
                    break;
            }
                shopProduct.setProduct(product);

                shopProduct.setShop(shop);

                shopProducts.add(shopProduct);
            }

            beacon.setShop(shop);
            shop.setBeacon(beacon);
            shop.setProducts(shopProducts);
            shop.setStore(store);

            Set<Shop> shops = new HashSet<Shop>();

            shops.add(shop);

            store.setShops(shops);

            storeService.createStore(store);

        }
}
