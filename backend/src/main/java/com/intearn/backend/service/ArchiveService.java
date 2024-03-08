package com.intearn.backend.service;

import com.intearn.backend.domain.Archive;
import com.intearn.backend.repository.ArchiveRepository;
import com.intearn.backend.s3.S3Buckets;
import com.intearn.backend.s3.S3Service;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ArchiveService {

    private final ArchiveRepository archiveRepository;
    private final S3Service s3Service;
    private final S3Buckets s3Buckets;

    /**
     * 모든 게시글 조회
     */
    public List<Archive> getAllArchives() {
        return archiveRepository.findAll();
    }

    /**
     * 게시글 상세 조회
     */
    public Optional<Archive> getArchiveById(Long id) {
        return archiveRepository.findById(id);
    }

    /**
     * 게시글 이미지 조회
     */
    public byte[] getArchiveImg(Long id) {
        Optional<Archive> archive = archiveRepository.findById(id);
        String imgId = archive.get().getImgId();
        byte[] img = s3Service.getObject(
                s3Buckets.getCustomer(),
                "archive-images/%s/%s".formatted(id, imgId)
        );
        return img;
    }

    /**
     * 게시글 생성
     */
    @Transactional
    public Archive createArchive(Archive archive) {
        // 게시글 작성 시간을 Service 계층에서 관리
        archive.setCreatedDate(LocalDateTime.now());
        return archiveRepository.save(archive);
    }

    /**
     * 게시글 수정
     */
    @Transactional
    public Archive updateArchive(Archive archive, MultipartFile file) {
        // 게시글 수정 시간을 Service 계층에서 관리
        archive.setModifiedDate(LocalDateTime.now());

        // S3에 이미지 저장
        uploadToS3(archive, file);
        return archiveRepository.save(archive);
    }

    /**
     * 게시글 삭제
     */
    @Transactional
    public void deleteArchive(Long id) {
        archiveRepository.deleteById(id);
    }

    @Transactional
    public void uploadToS3(Archive archive, MultipartFile file) {
        String imgId;
        if (archive.getImgId() == null) {
            imgId = UUID.randomUUID().toString();
        } else {
            imgId = archive.getImgId();
        }
        try {
            s3Service.putObject(
                    s3Buckets.getCustomer(),
                    "archive-images/%s/%s".formatted(archive.getId(), imgId),
                    file.getBytes()
            );
            archive.setImgId(imgId);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
