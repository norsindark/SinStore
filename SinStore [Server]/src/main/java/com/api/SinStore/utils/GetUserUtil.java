package com.api.SinStore.utils;

import org.springframework.data.domain.Pageable;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

public class GetUserUtil {
//    public static Pageable getPageable(int page, int size) {
//        return org.springframework.data.domain.PageRequest.of(page, size);
//    }

    public String getUserEmail() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String email = "";
        if (principal instanceof UserDetails) {
            email = ((UserDetails) principal).getUsername();
        }
        else {
            email = principal.toString();
        }
        return email;
    }
}
