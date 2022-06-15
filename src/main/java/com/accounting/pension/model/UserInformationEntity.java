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
import javax.persistence.Lob;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "USER_INFORMATION")
public class UserInformationEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "GENRE", nullable = false)
    private String genre;

    @Column(name = "AGE", nullable = false)
    private short age;

    @Lob
    @Column(columnDefinition = "BLOB", name = "ACCOUNT_IMAGE")
    private byte[] accountImage;

    @Column(name = "PHONE_NUMBER", nullable = false)
    private String phoneNumber;

    @OneToOne
    @JoinColumn(name = "USER_ID")
    @JsonIgnore
    private UserEntity userEntity;

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) {
            return false;
        }
        UserInformationEntity that = (UserInformationEntity) o;
        return id != null && Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}
