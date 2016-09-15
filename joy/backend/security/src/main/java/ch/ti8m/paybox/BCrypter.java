package ch.ti8m.paybox;

import java.security.SecureRandom;
import org.mindrot.jbcrypt.BCrypt;

/**
 * Created by Fatih on 10.05.16.
 */
public class BCrypter {

    public String bCryptPw(String pw){
        // Cryptographically strong random number generator
        SecureRandom random = new SecureRandom();
        // Hash password with generated salt
        // 10: number of rounds of hashing
        return BCrypt.hashpw(pw, BCrypt.gensalt(10, random));
    }
    // Method to check password
    public boolean checkPassword(String pw, String pwBCrypt){
        return BCrypt.checkpw(pw, pwBCrypt);
    }

}