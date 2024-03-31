package com.api.SinStore.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "address")
public class Address {
    @Id
    @UuidGenerator
//    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", length = 36, nullable = false)
    private String id;

    @Column(nullable = true)
    private String street;

    @Column(nullable = true)
    private String country;

    @Column(nullable = true)
    private String city;

    @OneToOne(mappedBy = "address",cascade = CascadeType.ALL, orphanRemoval = false)
    public User user;
}
