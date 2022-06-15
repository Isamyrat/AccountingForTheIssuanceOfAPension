package com.accounting.pension.model.Utils;

import lombok.Getter;

@Getter
public enum ReasonToRetire {
    BY_AGE("По возрасту женщина(58), мужчина(63)");

    private final String str;

    ReasonToRetire(String str) {
        this.str = str;
    }
}