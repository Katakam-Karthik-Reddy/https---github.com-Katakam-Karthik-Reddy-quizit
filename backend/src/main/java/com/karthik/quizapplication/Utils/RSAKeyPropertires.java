package com.karthik.quizapplication.Utils;

import java.security.KeyPair;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;

import org.springframework.stereotype.Component;

import lombok.Getter;
import lombok.Setter;

@Component
@Getter
@Setter
public class RSAKeyPropertires {

    private RSAPublicKey publicKey;
    private RSAPrivateKey privateKey;

    public RSAKeyPropertires() throws IllegalAccessException {
        KeyPair keyPair = KeyGenerator.generatRsaKey();
        this.publicKey = (RSAPublicKey) keyPair.getPublic();
        this.privateKey = (RSAPrivateKey) keyPair.getPrivate();
    }

}
