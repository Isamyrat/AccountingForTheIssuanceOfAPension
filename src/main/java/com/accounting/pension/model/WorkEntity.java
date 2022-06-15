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
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Getter
@Setter
@ToString
@RequiredArgsConstructor
@Table(name = "WORK")
public class WorkEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, name = "NAME_OF_WORK")
    private String nameOfWork;

    @Column(nullable = false, name = "POSITION")
    private String position;

    @Column(nullable = false, name = "DID_WORK_FROM")
    private LocalDate didWorkFrom;

    @Column(nullable = false, name = "DID_WORK_TO")
    private LocalDate didWorkTo;

    @Column(nullable = false, name = "TAKE_SALARY")
    private Float takeSalary;

    @ManyToOne
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
        WorkEntity workEntity = (WorkEntity) o;
        return id != null && Objects.equals(id, workEntity.id);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }
}