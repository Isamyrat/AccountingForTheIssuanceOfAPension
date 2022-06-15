package com.accounting.pension.controller;

import com.accounting.pension.model.RetirementEntity;
import com.accounting.pension.model.Utils.ReasonToRetire;
import com.accounting.pension.service.RetirementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;
import java.util.TreeSet;


@RestController
@RequiredArgsConstructor
@RequestMapping(RetirementController.USER_RETIREMENT_URL)
public class RetirementController {

    public static final String USER_RETIREMENT_URL = "/user/retirement";
    private final RetirementService retirementService;

    @GetMapping("/{id}")
    public ResponseEntity<RetirementEntity> getRetirementByUserId(@PathVariable Long id) {
        return ResponseEntity.ok(retirementService.findByUserId(id));
    }

    @PostMapping("/{id}")
    public void createRetirement(@RequestBody RetirementEntity retirementEntity, @PathVariable Long id) {
        retirementService.saveRetirement(retirementEntity, id);
    }

    @PutMapping
    public void updateRetirement(@RequestBody RetirementEntity retirementEntity) {
        retirementService.updateRetirement(retirementEntity);
    }

    @GetMapping("/findRetirement/{id}")
    public ResponseEntity<RetirementEntity> getRetirementById(@PathVariable Long id) {
        return ResponseEntity.ok(retirementService.findById(id));
    }

    @GetMapping("/reasonToRetire")
    public ResponseEntity<Set<String>> reasonToRetire() {
        return new ResponseEntity<>(new TreeSet<>(List.of(ReasonToRetire.BY_AGE.getStr())),
                                    HttpStatus.OK);
    }
}
