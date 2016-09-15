package ch.ti8m.paybox.service;

import ch.ti8m.paybox.entity.customer.Customer;
import ch.ti8m.paybox.entity.purchase.*;
import ch.ti8m.paybox.entity.store.Product;
import ch.ti8m.paybox.repository.*;
import com.paypal.api.payments.*;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.OAuthTokenCredential;
import com.paypal.base.rest.PayPalRESTException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sun.java2d.pipe.SpanShapeRenderer;

import java.math.BigDecimal;
import java.math.MathContext;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by Fatih on 11.05.16.
 */
@Service
public class PurchaseService {

    @Autowired
    CustomerRepository customerRepository;
    @Autowired
    ShopRepository shopRepository;
    @Autowired
    PurchaseRepository purchaseRepository;
    @Autowired
    PurchaseProductRepository purchaseProductRepository;
    @Autowired
    ProductRepository productRepository;


    // Method to save ordered products
    public String orderProducts(Purchase purchase) throws PayPalRESTException {

        // set number of passenger seat
        Integer integer = purchase.getPassengerSeat();

        // create 2 BigDecimal Objects and round amonut to two decimal palces
        BigDecimal bg1, bg2;

        bg1 = new BigDecimal(purchase.getTotalPrice());

        bg2 = bg1.setScale(2, bg1.ROUND_HALF_DOWN);

        Set<PurchaseProduct> purchaseProductSet = new HashSet<>();

        // create a purchases object and fill it
        Purchase purchaseOrder = new Purchase();

        Customer customer = customerRepository.findOne(purchase.getCustomer().getId());

        purchaseOrder.setShop(shopRepository.findOne(purchase.getShop().getId()));
        purchaseOrder.setCustomer(customer);
        purchaseOrder.setTotalPrice(bg2.toString());

        // get the current date and form it to yyy/MM/dd HH:mm
        Date date = new Date();
        SimpleDateFormat creationDateFormat = new SimpleDateFormat("yyyy/MM/dd HH:mm");
        SimpleDateFormat orderIdFormat = new SimpleDateFormat("dd/MM/yyyy");
        purchaseOrder.setCreationDate(creationDateFormat.format(date));

        List<Purchase> p = purchaseRepository.findByCustomerId(purchase.getCustomer().getId());

        purchaseOrder.setOrderId(purchaseOrder.getCustomer().getEmail() + "-" + orderIdFormat.format(date) + "-" + (p.size()+1));

        if(!integer.equals(null)){
            purchaseOrder.setPassengerSeat(purchase.getPassengerSeat());
        }

        purchaseRepository.save(purchaseOrder);

        // iterate though all products, set purchase value and save them
        for(ShoppingCart sc : purchase.getShoppingCart()){
            PurchaseProduct purchaseProduct = new PurchaseProduct();
            purchaseProduct.setCount(sc.getAmount());
            purchaseProduct.setProduct(sc.getProduct());
            purchaseProduct.setPrice(sc.getPrice());
            purchaseProduct.setPurchase(purchaseOrder);
            purchaseProductRepository.save(purchaseProduct);
            purchaseProductSet.add(purchaseProduct);
        }
        // set product value in purchase
        purchaseOrder.setProducts(purchaseProductSet);
        // pay order
        Payment payment = payOrder(purchaseOrder, purchase.getPaymentCreditCard());

        System.out.println(payment.getState());

        if(payment.getState().equals("approved")){
            // save purchase
            purchaseOrder.setPaymentDate(payment.getCreateTime());
            purchaseOrder.setPaymentDetails(payment.getTransactions().get(0).getDescription());
            purchaseOrder.setStatus(Purchase.STATE_ORDERED);
            purchaseRepository.save(purchaseOrder);
        } else {
            purchaseProductRepository.delete(purchaseOrder.getProducts());
            purchaseRepository.delete(purchaseOrder);
        }

        return payment.getState();
    }

    // Method to execute payment
    // TODO: payment routine
    public Payment payOrder(Purchase purchase, PaymentCreditCard paymentCreditCard) throws PayPalRESTException {
        // define skd mode
        Map<String, String> sdkConfig = new HashMap<String, String>();
        sdkConfig.put("mode", "sandbox");

        // try to obtain am access token with credentials
        String accessToken = new OAuthTokenCredential("AYaTXIH-V82tBhKG9DoulHdjvpmpQX-dqIyyZjaanIlrdxtH89oGMSvNELw0uGbqvu03VDpRF2DM9Fyh",
                "EE6rXixlrqTDbfoh7q6_m3EkcT3EZysXm1TVkaw_rXhfWmsVb-tBgz7nLqNhiWoLM3qWuwjrklf-NvR5", sdkConfig).getAccessToken();

        // set APIContext
        APIContext apiContext = new APIContext(accessToken);
        apiContext.setConfigurationMap(sdkConfig);

        // Set creditCard information's
        CreditCard creditCard = new CreditCard();
        creditCard.setType(paymentCreditCard.getType());
        creditCard.setNumber(paymentCreditCard.getNumber());
        creditCard.setExpireMonth(paymentCreditCard.getExpire_month());
        creditCard.setExpireYear(paymentCreditCard.getExpire_year());
        creditCard.setFirstName(paymentCreditCard.getFirstName());
        creditCard.setLastName(paymentCreditCard.getLastName());

        // set fundingInstrument object
        FundingInstrument fundingInstrument = new FundingInstrument();
        fundingInstrument.setCreditCard(creditCard);

        List<FundingInstrument> fundingInstrumentList = new ArrayList<FundingInstrument>();
        fundingInstrumentList.add(fundingInstrument);

        // define payer
        Payer payer = new Payer();
        payer.setFundingInstruments(fundingInstrumentList);
        payer.setPaymentMethod(paymentCreditCard.getMethod());

        // define amount of order
        Amount amount = new Amount();
        amount.setCurrency(paymentCreditCard.getCurrency());

        amount.setTotal(purchase.getTotalPrice());

        // define transaction information's
        Transaction transaction = new Transaction();
        transaction.setDescription(paymentCreditCard.getDescription() + purchase.getShop().getName());
        transaction.setAmount(amount);

        List<Transaction> transactions = new ArrayList<Transaction>();
        transactions.add(transaction);

        // define payment information's
        Payment payment = new Payment();
        payment.setIntent(paymentCreditCard.getIntent());
        payment.setPayer(payer);
        payment.setTransactions(transactions);

        // execute payment by triggering external payment provider
        Payment createdPayment = payment.create(apiContext);

        // return result of payment
        return createdPayment;
    }

    // Method to get a order
    public List<Purchase> getOrder(){
        List<Purchase> purchases = new ArrayList<>();
            // find purchases with specific status
            purchases = purchaseRepository.findByStatus(2);
            // check if purchases are found
            if (purchases.isEmpty()){
                System.out.println("no purchase found");
            }
            // set all shops in purchases to null because of an infinite recursion exception
            for(int i = 0; i < purchases.size(); i++){
                purchases.get(i).setShop(null);
            }
        // return list of purchases
        return purchases;

    }
    // Method to change order status
    public void updateOrderStatus(Purchase purchase){
        // find searched purchase
        Purchase currentPurchases = purchaseRepository.findOne(purchase.getId());
        // check status of purchases and set it to the next status
        switch (purchase.getStatus()){
            case 1:
                currentPurchases.setStatus(Purchase.STATE_ORDERED);
                break;
            case 2:
                currentPurchases.setStatus(Purchase.STATE_IN_PROGRESS);
                break;
            case 3:
                currentPurchases.setStatus(Purchase.STATE_READY);
                break;
            case 4:
                currentPurchases.setStatus(Purchase.STATE_COMPLETED);
                break;
            case 9:
                System.out.println("Current Order ist already completed!");
                break;

        }
        // update purchases with new status
        purchaseRepository.save(currentPurchases);
    }

}
