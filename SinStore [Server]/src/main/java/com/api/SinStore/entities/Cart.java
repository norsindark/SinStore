package com.api.SinStore.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "carts")
@Builder
public class Cart {

    @Id
    @UuidGenerator
    @Column(name = "id", length = 36, nullable = false)
    private String id;


    @OneToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User userId;
}
