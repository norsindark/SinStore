package com.api.SinStore.entities;

import com.api.SinStore.enums.RoleName;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id", nullable = false, length = 12)
    private int id;

    @Column(nullable = false, unique = true)
    @Enumerated(EnumType.STRING)
    private RoleName name;

    @OneToMany(mappedBy = "role")
    public Set<User> user = new HashSet<>();
}
