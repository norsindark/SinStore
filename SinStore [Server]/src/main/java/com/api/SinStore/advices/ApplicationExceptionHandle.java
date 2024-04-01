package com.api.SinStore.advices;

import com.api.SinStore.exceptions.SignInException;
import com.api.SinStore.exceptions.SignUpException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class ApplicationExceptionHandle {

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> handleInvalidArgument(MethodArgumentNotValidException e) {
        Map<String, String> errorMap = new HashMap<>();
        e.getBindingResult().getFieldErrors().forEach(
                error ->errorMap.put(error.getField(), error.getDefaultMessage())
        );
        return errorMap;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(SignUpException.class)
    @ResponseBody
    public Map<String ,String > handleBusinessException(SignUpException e) {
        Map<String ,String > errorMap = new HashMap<>();
        errorMap.put("error", e.getMessage());
        return errorMap;
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(SignInException.class)
    @ResponseBody
    public Map<String ,String > handleBusinessException(SignInException e) {
        Map<String ,String > errorMap = new HashMap<>();
        errorMap.put("error", e.getMessage());
        return errorMap;
    }
}
