package ch.ti8m.paybox;

import ch.ti8m.paybox.importer.CustomerImport;
import ch.ti8m.paybox.importer.StoreImport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

/**
 * Created by Fatih on 23.05.16.
 */
@Component
public class ApplicationStartup implements ApplicationListener<ContextRefreshedEvent> {

    @Autowired
    CustomerImport customerImport;
    @Autowired
    StoreImport storeImport;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent event) {
        try {
            customerImport.importCustomerJoey();
            customerImport.importCustomerLisa();
            storeImport.importThaiStore();
            storeImport.importMcDonalds();
            storeImport.importCoop();
            storeImport.importSBB();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
