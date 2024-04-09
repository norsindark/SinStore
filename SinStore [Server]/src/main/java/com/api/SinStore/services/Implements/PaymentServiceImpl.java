package com.api.SinStore.services.Implements;

import com.api.SinStore.configs.PaymentConfig;
import com.api.SinStore.entities.Order;
import com.api.SinStore.entities.User;
import com.api.SinStore.payloads.requests.OrderRequest;
import com.api.SinStore.payloads.requests.PaymentRequest;
import com.api.SinStore.payloads.responses.CreateUrlResponse;
import com.api.SinStore.payloads.responses.PaymentResponse;
import com.api.SinStore.repositories.OrderRepository;
import com.api.SinStore.repositories.UserRepository;
import com.api.SinStore.services.Interfaces.OrderService;
import com.api.SinStore.services.Interfaces.PaymentService;
import com.google.common.hash.Hashing;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.TimeZone;
import java.util.*;

@Service
@Component
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private static final String VNPAY_TMN_CODE = "H2E74CSJ";
    private static final String VNPAY_HASH_SECRET = "KTRUIXRUCGAAUHIAQOQNROMHDFIBVXQZ";
    private static final String VNPAY_URL = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";

    private final UserRepository userRepository;

    private final OrderRepository orderRepository;

    private final OrderService orderService;

    //    @Override
//    public String createPaymentUrl(PaymentRequest request, HttpSession session) throws NoSuchAlgorithmException {
//
//        Optional<User>  user = this.userRepository.findById(request.getUserId());
//        if (user.isEmpty()) {
//            return "User not found";
//        }
//
//        String orderInfo = UUID.randomUUID().toString();
//
//        session.setAttribute("orderRequest", request);
//        session.setAttribute("orderInfo", orderInfo);
//
//
//
//        Map<String, String> vnp_Params = new HashMap<>();
//        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
//        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
//        String vnp_CreateDate = formatter.format(cld.getTime());
//        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);
//
//        cld.add(Calendar.MINUTE, 15);
//        String vnp_ExpireDate = formatter.format(cld.getTime());
//        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);
//        vnp_Params.put("vnp_Version", "2.0.0");
//        vnp_Params.put("vnp_Command", "pay");
//        vnp_Params.put("vnp_TmnCode", VNPAY_TMN_CODE);
//        vnp_Params.put("vnp_Locale", "vn");
//        vnp_Params.put("vnp_CurrCode", "VND");
//        vnp_Params.put("vnp_TxnRef", new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()));
//        vnp_Params.put("vnp_OrderInfo", orderInfo);
//        vnp_Params.put("vnp_OrderType", "billpayment");
//
//        DecimalFormat decimalFormat = new DecimalFormat("#");
//        String amountFormatted = decimalFormat.format(user.get().getCart().getTotalPrice() * 100);
//        vnp_Params.put("vnp_Amount", amountFormatted);
//
//        vnp_Params.put("vnp_ReturnUrl", "http://localhost:3000/payment/vnpay-return");
//        vnp_Params.put("vnp_IpAddr", "127.0.0.1");
//
//        Map<String, String> sortedParams = new TreeMap<>(vnp_Params);
//        StringBuilder sb = new StringBuilder();
//        for (Map.Entry<String, String> entry : sortedParams.entrySet()) {
//            sb.append(entry.getKey()).append("=").append(entry.getValue()).append("&");
//        }
//
//        String signData = VNPAY_HASH_SECRET + sb.toString();
//        MessageDigest md = MessageDigest.getInstance("SHA-256");
//        byte[] hashData = md.digest(signData.getBytes());
//        StringBuilder hashValue = new StringBuilder();
//        for (byte b : hashData) {
//            hashValue.append(Integer.toString((b & 0xff) + 0x100, 16).substring(1));
//        }
//
//        String sha256hex = Hashing.sha256()
//                .hashString(VNPAY_HASH_SECRET + sb.toString(), java.nio.charset.StandardCharsets.UTF_8)
//                .toString();
//
//        String queryUrl = sb.toString() + "vnp_SecureHashType=SHA256&vnp_SecureHash=" + hashValue;
//        System.out.println(hashValue.toString());
//        return VNPAY_URL + "?" + queryUrl;
//    }

    public String createPaymentUrl(HttpServletRequest req,
                                   HttpSession session,
                                   String userId,
                                   String fullName,
                                   String country,
                                   String city,
                                   String address,
                                   String postalCode,
                                   String phone,
                                   String email,
                                   String notes)
            throws NoSuchAlgorithmException, UnsupportedEncodingException {

        OrderRequest orderRequest = new OrderRequest(userId, fullName, country, city, address, postalCode, phone, email, notes);

        Optional<User> user = this.userRepository.findById(userId);
        if (user.isEmpty()) {
            return "User not found";
        }

        Order newOrder = orderService.paymentOrder(orderRequest);

        String orderInfo = newOrder.getId();

        String vnp_Version = "2.1.0";
        String vnp_Command = "pay";
        String orderType = "other";
        long amount = (long) (user.get().getCart().getTotalPrice()  * 100);
        String bankCode = req.getParameter("bankCode");

        String vnp_TxnRef = PaymentConfig.getRandomNumber(8);
        String vnp_IpAddr = PaymentConfig.getIpAddress(req);

        String vnp_TmnCode = PaymentConfig.vnp_TmnCode;

        Map<String, String> vnp_Params = new HashMap<>();
        vnp_Params.put("vnp_Version", vnp_Version);
        vnp_Params.put("vnp_Command", vnp_Command);
        vnp_Params.put("vnp_TmnCode", vnp_TmnCode);
        vnp_Params.put("vnp_Amount", String.valueOf(amount));
        vnp_Params.put("vnp_CurrCode", "VND");

        if (bankCode != null && !bankCode.isEmpty()) {
            vnp_Params.put("vnp_BankCode", bankCode);
        }
        vnp_Params.put("vnp_TxnRef", vnp_TxnRef);
        vnp_Params.put("vnp_OrderInfo", orderInfo);
        vnp_Params.put("vnp_OrderType", orderType);

        String locate = req.getParameter("language");
        if (locate != null && !locate.isEmpty()) {
            vnp_Params.put("vnp_Locale", locate);
        } else {
            vnp_Params.put("vnp_Locale", "vn");
        }
        vnp_Params.put("vnp_ReturnUrl", PaymentConfig.vnp_ReturnUrl);
        vnp_Params.put("vnp_IpAddr", vnp_IpAddr);

        Calendar cld = Calendar.getInstance(TimeZone.getTimeZone("Etc/GMT+7"));
        SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");
        String vnp_CreateDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_CreateDate", vnp_CreateDate);

        cld.add(Calendar.MINUTE, 5);
        String vnp_ExpireDate = formatter.format(cld.getTime());
        vnp_Params.put("vnp_ExpireDate", vnp_ExpireDate);

        List fieldNames = new ArrayList(vnp_Params.keySet());
        Collections.sort(fieldNames);
        StringBuilder hashData = new StringBuilder();
        StringBuilder query = new StringBuilder();
        Iterator itr = fieldNames.iterator();
        while (itr.hasNext()) {
            String fieldName = (String) itr.next();
            String fieldValue = (String) vnp_Params.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                //Build hash data
                hashData.append(fieldName);
                hashData.append('=');
                hashData.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                //Build query
                query.append(URLEncoder.encode(fieldName, StandardCharsets.US_ASCII.toString()));
                query.append('=');
                query.append(URLEncoder.encode(fieldValue, StandardCharsets.US_ASCII.toString()));
                if (itr.hasNext()) {
                    query.append('&');
                    hashData.append('&');
                }
            }
        }
        String queryUrl = query.toString();
        String vnp_SecureHash = PaymentConfig.hmacSHA512(PaymentConfig.secretKey, hashData.toString());
        queryUrl += "&vnp_SecureHash=" + vnp_SecureHash;
        String paymentUrl = PaymentConfig.vnp_PayUrl + "?" + queryUrl;

        CreateUrlResponse paymentResponse = new CreateUrlResponse();
        paymentResponse.setStatus(HttpStatus.CREATED);
        paymentResponse.setMessage("Success");
        paymentResponse.setUrl(paymentUrl);

        return paymentUrl;
    }

    @Override
    public String vnpayReturn(Map<String, String> params, HttpSession session) throws NoSuchAlgorithmException {
        String vnp_SecureHash = params.get("vnp_SecureHash");
        params.remove("vnp_SecureHash");
        params.remove("vnp_SecureHashType");

        Map<String, String> sortedParams = new TreeMap<>(params);
        StringBuilder sb = new StringBuilder();
        for (Map.Entry<String, String> entry : sortedParams.entrySet()) {
            sb.append(entry.getKey()).append("=").append(entry.getValue()).append("&");
        }

        String signData = VNPAY_HASH_SECRET + sb.toString();
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] hashData = md.digest(signData.getBytes());
        StringBuilder hashValue = new StringBuilder();
        for (byte b : hashData) {
            hashValue.append(Integer.toString((b & 0xff) + 0x100, 16).substring(1));
        }

        OrderRequest orderRequest = (OrderRequest) session.getAttribute("orderRequest");
        if (orderRequest == null) {
            System.out.println("orderRequest is not in the session");
        } else {
            System.out.println("orderRequest: " + orderRequest);
        }

        if (hashValue.toString().equals(vnp_SecureHash)) {

            return "Payment success";
        } else {
            return "Payment error";
        }
    }
}
