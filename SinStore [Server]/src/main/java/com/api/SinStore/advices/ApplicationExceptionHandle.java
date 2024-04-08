package com.api.SinStore.advices;

import com.api.SinStore.exceptions.SignInException;
import com.api.SinStore.exceptions.SignUpException;
import com.api.SinStore.exceptions.UserNotFoundException;
import com.api.SinStore.payloads.responses.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

@RestControllerAdvice
public class ApplicationExceptionHandle {

//    @ResponseStatus(HttpStatus.OK)
//    @ExceptionHandler(MethodArgumentNotValidException.class)
//    public Map<String, String> handleInvalidArgument(MethodArgumentNotValidException e) {
//        Map<String, String> errorMap = new HashMap<>();
//        e.getBindingResult().getFieldErrors().forEach(
//                error ->errorMap.put(error.getField(), error.getDefaultMessage())
//        );
//        return errorMap;
//    }
//
//    @ResponseStatus(HttpStatus.OK)
//    @ExceptionHandler(SignUpException.class)
//    @ResponseBody
//    public Map<String ,String > handleBusinessException(SignUpException e) {
//        Map<String ,String > errorMap = new HashMap<>();
//        errorMap.put("error", e.getMessage());
//        return errorMap;
//    }
//
//    @ResponseStatus(HttpStatus.OK)
//    @ExceptionHandler(SignInException.class)
//    @ResponseBody
//    public Map<String ,String > handleBusinessException(SignInException e) {
//        Map<String ,String > errorMap = new HashMap<>();
//        errorMap.put("error", e.getMessage());
//        return errorMap;
//    }
//
//    @ResponseStatus(HttpStatus.OK)
//    @ExceptionHandler(UserNotFoundException.class)
//    @ResponseBody
//    public Map<String ,String > handleBusinessException(UserNotFoundException e) {
//        Map<String ,String > errorMap = new HashMap<>();
//        errorMap.put("error", e.getMessage());
//        return errorMap;
//    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse> handleInvalidArgument(MethodArgumentNotValidException e) {
        String errorMessage = Objects.requireNonNull(e.getBindingResult().getFieldError()).getDefaultMessage();
        ApiResponse apiResponse = new ApiResponse("Error: " + errorMessage, HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(SignUpException.class)
    public ResponseEntity<ApiResponse> handleBusinessException(SignUpException e) {
        ApiResponse apiResponse = new ApiResponse("Sign up error: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(SignInException.class)
    public ResponseEntity<ApiResponse> handleBusinessException(SignInException e) {
        ApiResponse apiResponse = new ApiResponse("Sign in error: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiResponse> handleBusinessException(UserNotFoundException e) {
        ApiResponse apiResponse = new ApiResponse("User not found error: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        return new ResponseEntity<>(apiResponse, HttpStatus.BAD_REQUEST);
    }
}
