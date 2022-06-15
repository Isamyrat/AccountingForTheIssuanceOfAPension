package com.accounting.pension.controller;

import com.accounting.pension.model.WorkEntity;
import com.accounting.pension.service.WorkService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
@RequestMapping(WorkController.WORK_URL)
public class WorkController {
    public static final String WORK_URL = "/work";
    private final WorkService workService;

    @GetMapping("/")
    public ResponseEntity<Page<WorkEntity>> getWorkByUserId(Pageable pageable, Long id) {
        return workService.findAllWorksByUserId(pageable, id);
    }

    @PostMapping("/{id}")
    public void createWork(@RequestBody WorkEntity workEntity, @PathVariable Long id) {
        workService.saveWork(workEntity, id);
    }

    @DeleteMapping("/{id}")
    public void deleteWork(@PathVariable Long id) {
        workService.deleteWork(id);
    }

    @PutMapping
    public void updateWork(@RequestBody WorkEntity workEntity) {
        workService.updateWork(workEntity);
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<WorkEntity> getWorkById(@PathVariable Long id) {
        return ResponseEntity.ok(workService.findById(id));
    }
}
