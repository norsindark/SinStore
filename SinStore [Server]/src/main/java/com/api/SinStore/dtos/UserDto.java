package com.api.SinStore.dtos;

import com.api.SinStore.entities.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    @NotBlank(message = "name can't be empty")
    private String fullName;

    @Email
    @Column(unique = true)
    @NotBlank(message = "email can't be empty")
    private String email;

    @NotBlank(message = "password can't be empty")
    @Pattern(regexp = "^.{6,}$", message = "password need more than 6 character")
    private String password;

    @NotBlank(message = "phone can't be empty")
    @Pattern(regexp = "^\\d{10,}$", message = "phone number must be a number")
    private String  phone;

    private boolean status;

    private boolean enabled;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp created_at;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
    private Timestamp updated_at;

    public UserDto(User user) {
        this.email = user.getEmail();
        this.password = user.getPassword();
        this.fullName = user.getFullName();
        this.phone = user.getPhone();
        this.status = user.getStatus();
        this.enabled = user.isEnabled();
        this.created_at = user.getCreated_at();
        this.updated_at = user.getUpdated_at();
    }
}
