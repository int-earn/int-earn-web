package com.intearn.backend.service;

import com.intearn.backend.domain.Archive;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
@Transactional
class ArchiveServiceTest {

    /*@Autowired
    ArchiveService archiveService;

    @Test
//    @Rollback(value = false)
    void getAllArchives() {
        Archive archive1 = new Archive();
        archive1.setTitle("제목 1");
        archive1.setContent("내용 1");

        Archive archive2 = new Archive();
        archive2.setTitle("제목 2");
        archive2.setContent("내용 2");

        archiveService.createArchive(archive1);
        archiveService.createArchive(archive2);

        assertEquals(2, archiveService.getAllArchives().size());
    }

    @Test
    void getArchiveById() {
        // 생략
    }

    @Test
    void createArchive() {
        Archive archive = new Archive();
        archive.setTitle("제목입니다.");
        archive.setContent("내용입니다.");

        // 새로 생성한 게시글
        Archive newArchive = archiveService.createArchive(archive);

        // ID 값을 통해 찾은 게시글
        Optional<Archive> findArchive = archiveService.getArchiveById(newArchive.getId());

        assertEquals(newArchive, findArchive.get());
    }

    @Test
    @Rollback(value = false)
    void updateArchive() {
        Archive archive = new Archive();
        archive.setTitle("제목");
        archive.setContent("내용");

        Archive newArchive = archiveService.createArchive(archive);

        String modifiedContent = "변경된 내용";
        newArchive.setContent(modifiedContent);

        Optional<Archive> findArchive = archiveService.getArchiveById(newArchive.getId());
        if (!findArchive.isEmpty()) {
            assertEquals(modifiedContent, findArchive.get().getContent());
        }
    }

    @Test
    void deleteArchive() {
        Archive archive = new Archive();
        archive.setTitle("제목입니다.");
        archive.setContent("내용입니다.");

        // 새로 생성한 게시글
        Archive newArchive = archiveService.createArchive(archive);

        // 게시글 삭제
        archiveService.deleteArchive(newArchive.getId());

        Optional<Archive> findArchive = archiveService.getArchiveById(newArchive.getId());

        assertEquals(Optional.empty(), findArchive);
    }*/

}