package ch.ti8m.paybox;

import io.jsonwebtoken.*;

import javax.crypto.spec.SecretKeySpec;
import javax.xml.bind.DatatypeConverter;
import java.security.Key;
import java.util.Date;
import java.util.logging.Logger;

/**
 * Created by Fatih on 10.05.16.
 */
public class JSONWebToken {
    // generate secret key for JWT
    private final static String ISSUER = "PEANUT";
    byte [] apiKeySecretBytes = DatatypeConverter.parseBase64Binary(ISSUER);
    Key secretKey = new SecretKeySpec(apiKeySecretBytes, SignatureAlgorithm.HS256.getJcaName());

    private final static Logger LOGGER = Logger.getLogger(JSONWebToken.class.getName());

    // Method to create JWT
    public String createJwt(String id, String subject, long ttMillis){
        // Generate date as a specified number of milliseconds
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);

        // Generate token
        JwtBuilder builder = Jwts.builder().setId(id)
                .setIssuedAt(now)
                .setSubject(subject)
                .setIssuer(ISSUER)
                .signWith(SignatureAlgorithm.HS256, secretKey);

        // Generate expire date
        if(ttMillis >= 0){
            long expMillis = nowMillis + ttMillis;
            Date exp = new Date(expMillis);
            builder.setExpiration(exp);
        }

        // return generated token
        return builder.compact();
    }

    // Method to decode payload of jwt
    // Method just to log, will be removed later
    public void decodeJwt(String jwt){
        // Get body/claims with key and jwt
        Claims claims = Jwts.parser().setSigningKey(apiKeySecretBytes).parseClaimsJws(jwt).getBody();

        // Log ID, Subject, Issuer and Expire informations
        LOGGER.info("ID: " + claims.getId());
        LOGGER.info("Subject: " + claims.getSubject());
        LOGGER.info("Issuer: " + claims.getIssuer());
        LOGGER.info("Expire: " + claims.getExpiration());
    }

    // Method to check validation of jwt
    public String verifyJwt(String jwt, String subject){
        try {
            // Get body/claims with key and jwt
            Claims claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwt).getBody();
            // Check if jwt is expired
            if (claims.getExpiration().compareTo(new Date()) < 0) {
                return "expired";
            } else {
                // Check if jwt subject matches with given subject
                if (Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwt).getBody().getSubject().equals(subject)) {
                    return "trustful";
                } else {
                    return "mistrustfully";
                }
            }
        } catch (ExpiredJwtException e){
            return "expired";
        }
    }
}