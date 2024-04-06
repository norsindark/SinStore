package com.api.SinStore.services.Implements;

import com.api.SinStore.entities.User;
import com.api.SinStore.services.Interfaces.EmailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;

@Component
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;

    @Override
    public void sendPasswordResetEmail(User user, String token)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "dvan78281@gmail.com";
        String senderName = "Sin Store";
        String subject = "Please click this url to change your password";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to change your password:<br>"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">CHANGE PASSWORD</a></h3>"
                + "Thank you,<br>"
                + "SinD.";
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);
        content = content.replace("[[name]]", user.getFullName());

        String changePasswordUrl = "http://localhost:3000/auth/change-password?token=" + token;
        content = content.replace("[[URL]]", changePasswordUrl);

        helper.setText(content, true);
        javaMailSender.send(message);
    }
}
