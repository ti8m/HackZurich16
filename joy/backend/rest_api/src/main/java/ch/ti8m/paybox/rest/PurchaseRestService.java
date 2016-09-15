package ch.ti8m.paybox.rest;

import ch.ti8m.paybox.entity.purchase.PaymentCreditCard;
import ch.ti8m.paybox.entity.purchase.Purchase;
import ch.ti8m.paybox.entity.purchase.PurchaseProduct;
import ch.ti8m.paybox.service.PurchaseService;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by Fatih on 11.05.16.
 */
@RestController
@RequestMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
public class PurchaseRestService {

    @Autowired
    PurchaseService purchaseService;

    @RequestMapping(method = RequestMethod.POST, path = "/peanut/api/purchase/orderProducts")
    public String orderProducts(@RequestBody Purchase purchase) throws Exception {
        return purchaseService.orderProducts(purchase);
    }

    @RequestMapping(method = RequestMethod.PUT, path = "/peanut/api/purchase/updateOrderStatus")
    public void updateOrderStatus(@RequestBody Purchase purchase){
        purchaseService.updateOrderStatus(purchase);
    }

    // TODO: set pathParameter shopId if merchant app is ready
    @RequestMapping(method = RequestMethod.GET, path = "/peanut/api/purchase/getOrder")
    public List<Purchase> getOrder(){
        return purchaseService.getOrder();
    }

}
