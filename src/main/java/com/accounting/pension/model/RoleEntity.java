package com.accounting.pension.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.Hibernate;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import java.util.Objects;
import java.util.Set;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "role")
public class RoleEntity {
    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "NAME")
    private String name;

    @OneToMany(targetEntity = UserEntity.class, mappedBy = "roleEntity", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JsonIgnore
    @ToString.Exclude
    private Set<UserEntity> userEntities;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) {
            return false;
        }
        RoleEntity roleEntity = (RoleEntity) o;
        return id != null && Objects.equals(id, roleEntity.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
