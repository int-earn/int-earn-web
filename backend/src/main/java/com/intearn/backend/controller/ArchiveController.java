package com.intearn.backend.controller;

import com.intearn.backend.config.PrincipalDetails;
import com.intearn.backend.domain.Archive;
import com.intearn.backend.service.ArchiveService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.intearn.backend.dto.ArchiveDto.*;

@RestController
@RequiredArgsConstructor
public class ArchiveController {

    private final ArchiveService archiveService;

    /**
     * 게시글 전체 조회
     */
    @GetMapping(value = "/api/archive")
    public List<ArchiveResponse> showArchive () {
        List<Archive> allArchives = archiveService.getAllArchives();
        return allArchives.stream()
                .map(m -> new ArchiveResponse(m.getId(), m.getTitle(), m.getContent(), m.getCreatedDate(), m.getModifiedDate(),
                                m.getUser().getId(), m.getUser().getNickname(),
                                m.getUser().getMajor() == null ? null : m.getUser().getMajor().name(),
                                m.getUser().getStudentId(),
                                Base64.getEncoder().encodeToString(archiveService.getArchiveImg(m.getId()))))
                .collect(Collectors.toList());
    }

    /**
     * 게시글 상세 조회
     */
    @GetMapping("/api/archive/{archiveId}")
    public ResponseEntity<ArchiveResponse> showArchiveDetail (@PathVariable("archiveId") Long archiveId) {
        Optional<Archive> findArchive = archiveService.getArchiveById(archiveId);
        byte[] img = archiveService.getArchiveImg(archiveId);
        String imgBase64 = Base64.getEncoder().encodeToString(img);
        if (findArchive.isPresent()) {
            Archive archive = findArchive.get();
            ArchiveResponse archiveResponse = new ArchiveResponse(
                    archive.getId(),
                    archive.getTitle(),
                    archive.getContent(),
                    archive.getCreatedDate(),
                    archive.getModifiedDate(),
                    archive.getUser().getId(),
                    archive.getUser().getNickname(),
                    archive.getUser().getMajor() == null ? null : archive.getUser().getMajor().name(),
                    archive.getUser().getStudentId(),
                    imgBase64
            );
            return ResponseEntity.ok(archiveResponse);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * 게시글 제목 조회
     */
    @GetMapping("/api/archive/title")
    public List<ArchiveTitleResponse> showArchiveTitle () {
        List<Archive> allArchives = archiveService.getAllArchives();
        return allArchives.stream()
                .map(m -> new ArchiveTitleResponse(m.getId(), m.getTitle(), m.getCreatedDate()))
                .collect(Collectors.toList());
    }

    /**
     * 게시글 작성
     */
    @PostMapping(value = "/api/archive")
    public ResponseEntity<String> createArchive (
            //@RequestBody @Valid ArchiveRequest archiveRequest,
                                                @RequestParam("image") MultipartFile file,
                                                @RequestParam("title") String title,
                                                @RequestParam("content") String content,
                                               @AuthenticationPrincipal PrincipalDetails principalDetails) {

        // Archive 엔티티 객체 생성
        Archive archive = new Archive();
        archive.setTitle(title);
        archive.setContent(content);
        archive.setUser(principalDetails.getUser());

        // 저장
        Archive newArchive = archiveService.createArchive(archive);

        // 이미지 업로드
        archiveService.uploadToS3(newArchive, file);

        if (newArchive != null) {
            return ResponseEntity.status(HttpStatus.CREATED).body("게시글이 성공적으로 생성되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시문 생성에 실패하였습니다.");
        }
    }


    /**
     * 게시글 수정
     */
    @PutMapping("/api/archive/{archiveId}")
    public ResponseEntity<String> modifyArchive (//@RequestBody @Valid ArchiveRequest archiveRequest,
                                             @PathVariable("archiveId") Long archiveId,
                                             @RequestParam("image") MultipartFile file,
                                             @RequestParam("title") String title,
                                             @RequestParam("content") String content,
                                             @AuthenticationPrincipal PrincipalDetails principalDetails) {

        Optional<Archive> findArchive = archiveService.getArchiveById(archiveId);

        if (findArchive.isPresent()) {

            Archive archive = findArchive.get();

            // 현재 로그인한 사용자와 게시물 작성자가 일치하는지 확인
            Long userId = principalDetails.getUser().getId();
            Long authorId = archive.getUser().getId();
            if (!userId.equals(authorId)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("게시글을 수정할 권한이 없습니다.");
            }

            // 게시물 내용 수정
            archive.setTitle(title);
            archive.setContent(content);

            // 수정
            archiveService.updateArchive(archive, file);

            return ResponseEntity.ok().body("게시글이 성공적으로 수정되었습니다.");
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시문 수정에 실패하였습니다.");
        }
    }

    /**
     * 게시글 삭제
     */
    @DeleteMapping("/api/archive/{archiveId}")
    public ResponseEntity<String> deleteArchive (@PathVariable("archiveId") Long archiveId,
                                               @AuthenticationPrincipal PrincipalDetails principalDetails) {

        Optional<Archive> findArchive = archiveService.getArchiveById(archiveId);

        if (findArchive.isPresent()) {

            Archive archive = findArchive.get();

            // 현재 로그인한 사용자와 게시물 작성자가 일치하는지 확인
            Long userId = principalDetails.getUser().getId();
            Long authorId = archive.getUser().getId();
            if (!userId.equals(authorId)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("게시글을 삭제할 권한이 없습니다.");
            }

            // 삭제
            archiveService.deleteArchive(archive);

            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시문 삭제에 실패하였습니다.");
        }
    }
}
