package com.api.SinStore.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UuidGenerator;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User implements UserDetails {
    @Id
    @UuidGenerator
//    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", length = 36, nullable = false)
    private UUID id;

    @Column(nullable = false, length = 64)
    private String fullName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(length = 64, nullable = false)
    private String password;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "roleId", nullable = false)
    private Role role;

    @OneToOne(fetch =  FetchType.EAGER)
    @JoinColumn(name = "address", nullable = true)
    private Address address;

    @Column(name = "phone", nullable = true, length = 13)
    private String  phone;

    @Column(name = "status")
    private boolean status;

    @Column(name = "enable")
    private boolean enabled;

    @Column(name = "created_at", nullable = false)
    private Timestamp created_at;

    @Column(name = "updated_at")
    private Timestamp  updated_at;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(String.valueOf(role.getName())));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public boolean getStatus() {
        return status;
    }
}
