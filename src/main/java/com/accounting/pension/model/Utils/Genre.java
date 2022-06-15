package com.accounting.pension.model.Utils;

import lombok.Getter;

@Getter
public enum Genre {
    MALE("Мужской"),
    FEMALE("Женский");

    private final String str;

    Genre(String str) {
        this.str = str;
    }
}
