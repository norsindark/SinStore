package com.api.SinStore.services.Implements;

import com.api.SinStore.entities.Order;
import com.api.SinStore.entities.User;
import com.api.SinStore.payloads.responses.ApiResponse;
import com.api.SinStore.repositories.OrderRepository;
import com.api.SinStore.services.Interfaces.EmailService;
import com.api.SinStore.services.Interfaces.OrderService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.aspectj.weaver.ast.Or;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.Optional;

@Component
@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;

    private final OrderRepository orderRepository;

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

    @Override
    public void sendMailOrder(String orderId)
            throws MessagingException, UnsupportedEncodingException {
        Optional<Order> order = orderRepository.findById(orderId);
        if (order.isPresent()) {
            Order _order = order.get();
            String toAddress = _order.getEmail();
            String fromAddress = "dvan78281@gmail.com";
            String senderName = "Sin Store";
            String subject = "Order Confirmation";
            String content = "Dear [[name]],<br>"
                    + "Your order has been confirmed. Your order ID is: " + orderId + "<br>"
                    + "Created Date: " + _order.getCreatedAt() + "<br>"
                    + "Total: " + _order.getTotalPrice() + "VND" + "<br>"
                    + "Status: " + _order.getStatus() + "<br>"
                    + "Thank you for shopping with us,<br>"
                    + "SinD.";
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message);

            helper.setFrom(fromAddress, senderName);
            helper.setTo(toAddress);
            helper.setSubject(subject);
            content = content.replace("[[name]]", _order.getFullName());

            helper.setText(content, true);
            javaMailSender.send(message);
        }
    }
}
