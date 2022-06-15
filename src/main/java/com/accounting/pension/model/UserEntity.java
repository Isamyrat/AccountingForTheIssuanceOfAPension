package com.accounting.pension.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "USER_ENTITY")
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "USERNAME")
    private String username;

    @Column(nullable = false, name = "PASSWORD")
    private String password;

    @Column(nullable = false, name = "NAME")
    private String name;

    @Column(nullable = false, name = "SURNAME")
    private String surname;

    @ManyToOne
    @JoinColumn(name = "ROLE_ID")
    @JsonIgnore
    private RoleEntity roleEntity;

    public UserEntity(Long id, String name, String surname) {
        this.id = id;
        this.name = name;
        this.surname = surname;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) {
            return false;
        }
        UserEntity userEntity = (UserEntity) o;
        return id != null && Objects.equals(id, userEntity.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
